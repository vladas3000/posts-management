import type { Comment } from "../../../types/comment"

export interface CommentsSliceState {
  postsComments: Record<number, number[] | undefined>
  comments: Record<number, Comment | undefined>
}
