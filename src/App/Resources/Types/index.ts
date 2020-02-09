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