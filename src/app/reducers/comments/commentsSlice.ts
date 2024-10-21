import type { CommentsSliceState } from "./types"
import { generateGetPostCommentsAction } from "./commentsActions"
import { createAppSlice } from "../../createAppSlice"
import type { RootState } from "../../store"

const initialState: CommentsSliceState = {
  comments: {},
  postsComments: {},
}

export const commentsSlice = createAppSlice({
  name: "comments",
  initialState,
  reducers: create => ({
    getPostComments: generateGetPostCommentsAction(create),
  }),
})

export const { getPostComments } = commentsSlice.actions

export const selectCommentsByPostId = (postId: number) => (state: RootState) =>
  state.comments.postsComments[postId]

export const selectComments = (state: RootState) => state.comments.comments
