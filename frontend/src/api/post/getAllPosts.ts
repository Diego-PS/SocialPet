import api from "..";

export interface GetAllPostsResBody {
    posts: IPost[];
}

export interface IPost {
    createdUTCDateTime: string;
    mediaUrl: string;
    pet: {
        name: string;
        nickname: string;
        createdUTCDateTime: string;
        profilePictureUrl: string;
    };
    textContent: string;
}

export const getAllPosts = async (): Promise<{ data: GetAllPostsResBody }> =>
    await api.get("/post/get", {});