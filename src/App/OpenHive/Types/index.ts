import { User } from '../../../Types';

export interface Project {
	project_id: number,
	board_id: number, // Board id
	t_id: number, // Chat id
	contributor: boolean, // True if the user viewing the page is a contributor
	collaborators: User[], // List of contributors TODO: fix inconsistent wording here
	commentthread: number, // Comment thread id
	title: string,
	link: string,
	description: string
}
