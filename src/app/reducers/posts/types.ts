import type { Post } from "../../../types/post"

export interface PostsSliceState {
  usersPosts: Record<number, number[] | undefined>
  posts: Record<number, Post | undefined>
}
