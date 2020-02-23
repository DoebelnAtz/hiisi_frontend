import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDismiss, useRequest } from '../../../../Hooks';
import queryString from 'query-string';

import {
	ResourceComments,
	ResourceDescription,
	ResourceHeader,
	ResourcePage,
	ResourceTag,
	ResourceTags,
	ResourceTitle,
	AddTagInput,
	ResourceContent,
	TagSearchResults,
	SearchResultTag,
	OutsideDiv,
	ModalDiv,
	DeleteTagButton,
} from './Styles';
import TextEditor from '../../../Components/TextEditor/index';
import ViewPost from '../../../Components/CommentThread/index';
import { makeRequest } from '../../../../Api/Api';
import { RouteComponentProps } from '../../../../Types';
import { ResourceType, Tag } from '../Types';
import SaveButton from '../../../Components/Buttons/SaveButton/index';
import { useLocation, useParams } from 'react-router-dom';

const ResourceInfoPage: React.FC<RouteComponentProps<{ rid: number }>> = ({
	match,
	history,
}) => {
	const [resource, setResource, isLoading] = useRequest<ResourceType>(
		`resources/${match.params.rid}`,
		'get',
	);
	const [description, setDescription] = useState(resource?.description);
	const [tagSearch, setTagSearch] = useState('');

	const [results, setResults, isLoadingResults] = useRequest(
		`resources/tags?q=${tagSearch}&limit=10`,
		'get',
	);

	const insideRef = useRef<HTMLDivElement>(null);
	const handleDescriptionChange = (e: string) => {
		setDescription(e);

		!!resource && setResource({ ...resource, description: e });
	};

	useDismiss(insideRef, () => {
		history.push('/resources');
	});

	const renderSearchResults = () => {
		return results
			.filter(
				(tag: Tag) =>
					!resource?.tags.find((t) => t.tag_id === tag.tag_id),
			) // make sure we don't show already added tags
			.map((tag: Tag) => {
				return (
					<SearchResultTag key={tag.tag_id} color={tag.color}>
						# {tag.title}
						<span
							style={{ marginLeft: 'auto' }}
							onClick={() => addTag(tag)}
						>
							+
						</span>
					</SearchResultTag>
				);
			});
	};

	const updateResource = async () => {
		let resp = await makeRequest('resources/update_resource', 'put', {
			resource: resource,
		});
		return !!resp.data?.success;
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
		<OutsideDiv>
			<ModalDiv ref={insideRef}>
				<ResourcePage>
					<ResourceHeader>
						<ResourceTitle>
							{!!resource && (
								<a href={`${resource?.link}`}>
									{`${resource?.title}`}
								</a>
							)}
							<SaveButton onClick={updateResource}>
								save
							</SaveButton>
						</ResourceTitle>
						<ResourceTags>
							{!isLoading &&
								!!resource?.tags.length &&
								resource.tags.map((tag) => {
									return (
										<ResourceTag
											owner={resource?.owner}
											key={tag.tag_id}
											color={tag.color}
										>
											# {tag.title}
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
												X
											</DeleteTagButton>
										</ResourceTag>
									);
								})}
						</ResourceTags>
					</ResourceHeader>
					<ResourceContent>
						<ResourceDescription
							full={!!resource && resource?.tags?.length > 2}
						>
							{!isLoading && (
								<TextEditor
									editable={resource?.owner}
									state={resource?.description}
									setState={(e: string) =>
										handleDescriptionChange(e)
									}
								/>
							)}
						</ResourceDescription>
						{!!resource && resource?.tags?.length < 3 && (
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
								commentthread={resource.commentthread}
							/>
						)}
					</ResourceComments>
				</ResourcePage>
			</ModalDiv>
		</OutsideDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default ResourceInfoPage;
