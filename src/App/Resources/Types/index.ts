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
	link: string,
	commentthread: number,
	owner: boolean
}

export interface ResourceListType {
	r_id: number,
	description: string,
	tags: string[],
	colors: string[],
	title: string,
	username: string,
	link: string,
	commentthread: number,
	owner: boolean
}

export type SubmitResourceProps = {
	popup: boolean,
	resources: ResourceListType[],
	setResources: Dispatch<SetStateAction<ResourceListType[] | undefined>>,
	setPopup: Dispatch<SetStateAction<boolean>>
}