import * as H from 'history';
interface MatchParams {
    name: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

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
    username: string,
    profile_pic: string,
    u_id: number
}

export interface focusList {
    focus: Array<String>
    title: string
}