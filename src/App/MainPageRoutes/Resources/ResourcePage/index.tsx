import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDismiss, useRequest, useWidth } from '../../../../Hooks';

import {
	ResourceComments,
	ResourceDescription,
	ResourceHeader,
	ResourceTag,
	ResourceTags,
	ResourceTitle,
	AddTagInput,
	ResourceContent,
	TagSearchResults,
	SearchResultTag,
	DeleteTagButton,
	ResourceThumbnail,
} from './Styles';
import TextEditor from '../../../Components/TextEditor';
import ViewPost from '../../../Components/CommentThread/index';
import { makeRequest } from '../../../../Api';
import { RouteComponentProps } from '../../../../Types';
import { ResourceType, Tag } from '../Types';
import Modal from '../../../Components/Modal';
import { RowDiv } from '../../../../Styles/LayoutStyles';

const ResourceInfoPage: React.FC<RouteComponentProps<{ rid: number }>> = ({
	match,
	history,
}) => {
	const [resource, setResource, isLoading] = useRequest<ResourceType>(
		`resources/${match.params.rid}`,
		'get',
		{},
	);
	const [description, setDescription] = useState(resource?.description);
	const [tagSearch, setTagSearch] = useState('');
	const [width, isMobile] = useWidth();
	const [results, setResults, isLoadingResults] = useRequest(
		`resources/tags?q=${tagSearch.toLowerCase()}&limit=${isMobile ? '7' : '9'}`,
		'get',
	);

	const insideRef = useRef<HTMLDivElement>(null);
	const handleDescriptionChange = (e: string) => {
		setDescription(e);

		!!resource && setResource({ ...resource, description: e });
	};

	const close = () => {
		history.push('/resources');
	};

	useDismiss(insideRef, close);

	const renderSearchResults = () => {
		return results
			.filter(
				(tag: Tag) =>
					!resource?.tags.find((t) => t.tag_id === tag.tag_id),
			) // make sure we don't show already added tags
			.map((tag: Tag) => {
				return (
					<SearchResultTag
						onClick={() => addTag(tag)}
						key={tag.tag_id}
						color={tag.color}
					>
						<span>{tag.title}</span>
						<span style={{ marginLeft: 'auto' }}>+</span>
					</SearchResultTag>
				);
			});
	};

	const updateResource = async () => {
		try {
			let resp = await makeRequest('resources/update_resource', 'put', {
				resource: resource,
			});
		} catch (e) {
			return false;
		}

		setTimeout(() => {
			close();
		}, 500);
		return true;
	};

	const addTag = async (tag: Tag) => {
		let resp = await makeRequest('resources/add_tags', 'post', {
			tag: tag,
			rId: match.params.rid,
		});
		if (!!resource && resp?.data) {
			setResource({ ...resource, tags: [...resource.tags, resp.data] });
		}
	};

	const deleteResourceTag = async (tagId: number, rId: number) => {
		let resp = await makeRequest('resources/delete_tag', 'delete', {
			tagId: tagId,
			rId: rId,
		});
		if (resp?.data && resource) {
			setResource({
				...resource,
				tags: resource.tags.filter((tag) => tag.tag_id !== tagId),
			});
		}
	};

	return ReactDOM.createPortal(
		<Modal
			save={updateResource}
			saveCondition={resource?.owner}
			close={close}
			inside={insideRef}
		>
			<ResourceHeader>
				{resource?.thumbnail && (
					<ResourceThumbnail
						onClick={(e: React.SyntheticEvent) => {
							e.stopPropagation();
							window.open(resource.link);
						}}
						src={resource.thumbnail}
						alt={'thumbnail'}
					/>
				)}
				<ResourceTitle isMobile={isMobile} full={!resource?.thumbnail}>
					{!!resource && (
						<a
							href={`${resource?.link}`}
							target="_blank"
							rel="noopener noreferrer"
						>{`${resource?.title}`}</a>
					)}
				</ResourceTitle>
			</ResourceHeader>
			<RowDiv>
				<ResourceTags full={!resource?.thumbnail}>
					{!isLoading &&
						!!resource?.tags.length &&
						resource.tags.map((tag) => {
							return (
								<ResourceTag
									owner={resource?.owner}
									key={tag.tag_id}
									color={tag.color}
								>
									<span>{tag.title}</span>
									<DeleteTagButton
										owner={resource?.owner}
										color={tag.color}
										onClick={() =>
											deleteResourceTag(
												tag.tag_id,
												resource?.r_id,
											)
										}
									>
										✕
									</DeleteTagButton>
								</ResourceTag>
							);
						})}
				</ResourceTags>
			</RowDiv>

			<ResourceContent>
				<ResourceDescription
					full={
						(!!resource && resource?.tags?.length > 2) ||
						!resource?.owner
					}
				>
					{!isLoading && resource && (
						<TextEditor
							editable={resource.owner}
							state={resource.description}
							setState={(e: string) => handleDescriptionChange(e)}
						/>
					)}
				</ResourceDescription>
				{!!resource && resource?.tags?.length < 3 && resource?.owner && (
					<TagSearchResults>
						<AddTagInput
							value={tagSearch}
							onChange={(e: React.SyntheticEvent) => {
								let target = e.target as HTMLInputElement;
								setTagSearch(target.value);
							}}
							placeholder={'+ Add Tag'}
						/>
						{!isLoadingResults && renderSearchResults()}
					</TagSearchResults>
				)}
			</ResourceContent>

			<ResourceComments>
				{!!resource && (
					<ViewPost
						focusList={{
							focus: [resource.username],
							title: 'author',
						}}
						OPAuthorId={resource.u_id}
						commentthread={resource.commentthread}
					/>
				)}
			</ResourceComments>
		</Modal>,
		document.querySelector('#modal') as Element,
	);
};

export default ResourceInfoPage;
