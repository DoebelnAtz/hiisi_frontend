export interface ThreadType {
	thread_name: string,
	thread_id: number,
}

export interface MessageType {
	username: string,
	m_id: number,
	time_sent: string,
	message: string
}

export interface RoomType {
	title: string,
	messages: MessageType[]
}

