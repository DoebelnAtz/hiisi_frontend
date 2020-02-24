import { Dispatch, SetStateAction } from 'react';

export interface Tag {
	tag_id: number,
	color: string,
	title: string
}

export interface ResourceType {
	r_id: number,
	vote: vote,
	published_date: string,
	description: string,
	tags: Tag[],
	title: string,
	username: string,
	u_id: number,
	link: string,
	commentthread: number,
	owner: boolean,
	votes: number
}

export interface ResourceListType {
	r_id: number,
	vote: vote,
	published_date: string,
	description: string,
	tags: string[],
	colors: string[],
	title: string,
	username: string,
	link: string,
	commentthread: number,
	owner: boolean,
	votes: number
}


export type vote = 1 | 0 | -1;