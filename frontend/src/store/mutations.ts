import { State } from "@/models/state";
import axios from "axios";
import { PostModel } from "@/models/post";
import { Alert } from "@/models/alert";
import Cookies from "js-cookie";

export default {
    SET_THEME(state: State, theme: string) {
        state.theme = theme;
    },
    LOGIN(state: State) {
        state.authenticated = true;
    },
    LOGOUT(state: State) {
        state.authenticated = false;
        state.username = "";
        Cookies.remove("auth", { domain: "localhost" });
        Cookies.remove("expiration", { domain: "localhost" });
    },
    async FETCH_POSTS(state: State, page: number) {
        const { data } = await axios.get(`http://localhost:3000/posts/${page}`);
        if (page === 1) {
            state.posts = data.posts as PostModel[];
            state.pages = data.pages as number;
        } else {
            const posts =  data.posts as PostModel[];
            for (const post of posts) {
                state.posts.push(post);
            }
        }
    },
    async FETCH_TAG_POSTS(state: State, payload: {page: number, tag: string}) {
        const { data } = await axios.get(`http://localhost:3000/tag/${payload.tag}/${payload.page}`);
        if (payload.page === 1) {
            state.tagPosts = data.posts as PostModel[];
            state.tagPages = data.pages as number;
        } else {
            const posts =  data.posts as PostModel[];
            for (const post of posts) {
                state.tagPosts.push(post);
            }
        }
    },
    EDIT_CONTENT(state: State, text: string) {
        state.content = text;
    },
    EDIT_COMMENT_CONTENT(state: State, text: string) {
        state.commentContent = text;
    },
    EDIT_POST_TITLE(state: State, text: string) {
        state.postTitle = text;
    },
    ADD_ALERT(state: State, alert: Alert) {
        state.alert = alert;
    },
    EDIT_EDIT_CONTENT(state: State, text: string) {
        state.editContent = text;
    },
    EDIT_EDIT_TITLE(state: State, text: string) {
        state.editPostTitle = text;
    },
    SET_USERNAME(state: State, username: string) {
        state.username = username;
    },
    SET_ADMIN(state: State, admin: boolean) {
        state.isAdmin = admin;
    },
    SET_CAN_POST(state: State, canPost: boolean) {
        state.canPost = canPost;
    },
    EDIT_TAGS(state: State, tags: string) {
        state.tags = tags;
    }
};
