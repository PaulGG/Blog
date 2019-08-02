import { Post } from "./post";

export interface State {
    theme: string;
    authenticated: boolean;
    posts: Post[];
    content: string;
}
