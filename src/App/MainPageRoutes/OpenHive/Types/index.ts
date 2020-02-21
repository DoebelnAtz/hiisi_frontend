import { User } from '../../../../Types/index';
import { vote } from '../../Resources/Types/index';

export interface Project {
	project_id: number,
	title: string,
	link: string,
	contributor: boolean, // True if the user viewing the page is a contributor
	collaborators: User[], // List of contributors TODO: fix inconsistent wording here
	commentthread: number, // Comment thread id
	published_date: string,
	vote: vote,
	votes: number
	description: string,
	board_id: number, // Board id
	t_id: number, // Chat id
}
