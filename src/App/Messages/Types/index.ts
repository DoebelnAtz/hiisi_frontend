export interface ThreadType {
	thread_name: string,
	thread_id: number,
	project_thread: boolean,
}

export interface MessageType {
	username: string,
	m_id: number,
	profile_pic: string
	time_sent: string,
	message: string
}

export interface RoomType {
	title: string,
	messages: MessageType[]
}

