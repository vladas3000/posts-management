import type { ReducerCreators } from "@reduxjs/toolkit"
import {
  createPost,
  deletePost,
  fetchPost,
  fetchUserPosts,
} from "../../../api/apiService"
import type { PostsSliceState } from "./types"
import { normalizeData } from "../../../utils/normalizeData"

export const buildGetUserPostsAction = (
  create: ReducerCreators<PostsSliceState>,
) => {
  return create.asyncThunk(
    async (userId: number) => {
      const posts = await fetchUserPosts(userId)

      const normalizedPosts = normalizeData(posts)

      return { userId, normalizedPosts }
    },
    {
      fulfilled: (state, action) => {
        const { userId, normalizedPosts } = action.payload
        state.usersPosts = {
          ...state.usersPosts,
          [userId]: normalizedPosts.ids,
        }
        state.posts = {
          ...state.posts,
          ...normalizedPosts.byId,
        }
      },
    },
  )
}

export const buildCreatePostAction = (
  create: ReducerCreators<PostsSliceState>,
) => {
  return create.asyncThunk(
    async (post: { title: string; body: string; userId: number }) => {
      const createdPost = await createPost(post)

      return createdPost
    },
    {
      fulfilled: (state, action) => {
        const { id, userId } = action.payload

        state.posts[id] = action.payload
        state.usersPosts[userId] = [id, ...(state.usersPosts[userId] || [])]
      },
    },
  )
}

export const buildDeletePostAction = (
  create: ReducerCreators<PostsSliceState>,
) => {
  return create.asyncThunk(
    async ({ postId, userId }: { userId: number; postId: number }) => {
      await deletePost(postId)

      return { postId, userId }
    },
    {
      fulfilled: (state, action) => {
        const { postId, userId } = action.payload

        const stateUserPosts = state.usersPosts[userId] || []

        delete state.posts[postId]
        state.usersPosts[userId] = stateUserPosts.filter(id => id !== postId)
      },
    },
  )
}

export const buildGetPostAction = (
  create: ReducerCreators<PostsSliceState>,
) => {
  return create.asyncThunk(
    async (postId: number) => {
      const post = await fetchPost(postId)

      return post
    },
    {
      fulfilled: (state, action) => {
        const { id } = action.payload

        state.posts[id] = action.payload
      },
    },
  )
}
