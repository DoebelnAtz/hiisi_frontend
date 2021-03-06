import { Dispatch, SetStateAction } from 'react';

export interface Tag {
	tag_id: number,
	color: string,
	title: string
}

export interface ResourceType {
	r_id: number,
	description: string,
	tags: Tag[],
	title: string,
	username: string,
	u_id: number,
	resource_type: string,
	link: string,
	commentthread: number,
	thumbnail: string,
	owner: boolean,
	edited: string,
	votes: number
}

export interface ResourceListType {
	r_id: number,
	vote: vote,
	saved: boolean,
	published_date: string,
	description: string,
	tags: string[],
	colors: string[],
	title: string,
	username: string,
	link: string,
	thumbnail: string,
	resource_type: string,
	commentthread: number,
	owner: boolean,
	edited: string,
	votes: number
}

export type SubmitResourceProps = {
	popup: boolean,
	resources: ResourceListType[],
	setResources: Dispatch<SetStateAction<ResourceListType[] | undefined>>,
	setPopup: Dispatch<SetStateAction<boolean>>
}

export type vote = 1 | 0 | -1;