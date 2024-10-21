import type { PostsSliceState } from "./types"

import { createAppSlice } from "../../createAppSlice"
import type { RootState } from "../../store"
import {
  buildCreatePostAction,
  buildDeletePostAction,
  buildGetUserPostsAction,
  buildGetPostAction,
} from "./postsActions"

const initialState: PostsSliceState = {
  posts: {},
  usersPosts: {},
}

export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: create => ({
    getUserPosts: buildGetUserPostsAction(create),
    getPost: buildGetPostAction(create),
    createPost: buildCreatePostAction(create),
    deletePost: buildDeletePostAction(create),
  }),
})

export const { getUserPosts, createPost, deletePost, getPost } =
  postsSlice.actions

export const selectPosts = (state: RootState) => state.posts.posts

export const selectPostsByUserId = (userId: number) => (state: RootState) =>
  state.posts.usersPosts[userId]

export const selectPostById = (postId?: number) => (state: RootState) =>
  postId ? state.posts.posts[postId] : undefined
