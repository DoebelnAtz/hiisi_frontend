import { vote } from '../../Resources/Types';


export interface MixedFeedItem {
	id: number;
	title: string;
	thumbnail: null | string;
	votes: number,
	link: string;
	published_date: string;
	vote: vote
	type: string;
}

export interface Profile {
	u_id: number;
	username: string;
	profile_pic: string;
	achievement_points: number;
	grade: number;
	class_of: string;
	correction_points: number;
	coalition_rank: number;
	level: number;
	location: string;
	coalition_points: number;
	wallet: number;
	active: boolean;
}
