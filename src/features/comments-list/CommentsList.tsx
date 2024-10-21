import type { FC } from "react"
import { memo, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getPostComments,
  selectComments,
  selectCommentsByPostId,
} from "../../app/reducers"
import { Box, Divider, List, Skeleton, styled, Typography } from "@mui/material"
import { Comment } from "./components/Comment"
import { EmptyList } from "../../components"

export interface CommentsListProps {
  postId: number
}

export const CommentsList: FC<CommentsListProps> = memo(({ postId }) => {
  const dispatch = useAppDispatch()
  const commentsIds = useAppSelector(selectCommentsByPostId(postId))
  const comments = useAppSelector(selectComments)
  const [isLoading, setIsLoading] = useState(true)

  const fetchComments = useCallback(async () => {
    await dispatch(getPostComments(postId))
    setIsLoading(false)
  }, [dispatch, postId])

  useEffect(() => {
    fetchComments()
  }, [dispatch, fetchComments, postId])

  const commentsLabel = isLoading
    ? "Comments"
    : `Comments (${commentsIds?.length || 0})`

  const renderComment = (commentId: number) => {
    const comment = comments[commentId]
    if (!comment) {
      return <></>
    }
    return <Comment key={commentId} body={comment.body} name={comment.name} />
  }

  const renderCommentsList = () => {
    if (commentsIds && commentsIds.length > 0) {
      return <List>{commentsIds.map(renderComment)}</List>
    }
    return <EmptyList message="No comments yet. Be the first to comment!" />
  }

  return (
    <Box>
      <Divider />
      <CommentsCount variant="body1">{commentsLabel}</CommentsCount>
      {isLoading ? (
        <>
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </>
      ) : (
        renderCommentsList()
      )}
    </Box>
  )
})

const CommentsCount = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}))
