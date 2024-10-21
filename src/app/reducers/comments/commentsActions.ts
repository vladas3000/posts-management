import type { ReducerCreators } from "@reduxjs/toolkit"
import { fetchPostComments } from "../../../api/apiService"
import type { CommentsSliceState } from "./types"
import { normalizeData } from "../../../utils/normalizeData"

export const generateGetPostCommentsAction = (
  create: ReducerCreators<CommentsSliceState>,
) => {
  return create.asyncThunk(
    async (postId: number) => {
      const comments = await fetchPostComments(postId)

      const normalizedComments = normalizeData(comments)

      return { postId, normalizedComments }
    },
    {
      fulfilled: (state, action) => {
        const { normalizedComments, postId } = action.payload

        state.postsComments = {
          ...state.postsComments,
          [postId]: normalizedComments.ids,
        }
        state.comments = {
          ...state.comments,
          ...normalizedComments.byId,
        }
      },
    },
  )
}
