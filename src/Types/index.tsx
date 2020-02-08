import * as H from 'history';
import React from 'react';
interface MatchParams {
	name: string;
}

export function createCtx<A>(defaultValue: A) {
	type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
	const defaultUpdate: UpdateType = () => defaultValue;
	const ctx = React.createContext({
		state: defaultValue,
		update: defaultUpdate,
	});
	function Provider(props: React.PropsWithChildren<{}>) {
		const [state, update] = React.useState(defaultValue);
		return <ctx.Provider value={{ state, update }} {...props} />;
	}
	return [ctx, Provider] as const;
}

interface Props extends RouteComponentProps<MatchParams> {}

// from typings
export interface RouteComponentProps<P> {
	match: match<P>;
	location: H.Location;
	history: H.History;
	staticContext?: any;
}

export interface match<P> {
	params: P;
	isExact: boolean;
	path: string;
	url: string;
}

export interface User {
	username: string;
	profile_pic: string;
	u_id: number;
}

export interface focusList {
	focus: Array<String>;
	title: string;
}
