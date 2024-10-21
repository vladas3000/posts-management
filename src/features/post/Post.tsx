import {
  Box,
  Button,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import type { FC } from "react"
import { memo } from "react"
import { CommentsList } from "../comments-list/CommentsList"

export interface PostProps {
  postId: number
  title: string
  body: string
  username?: string
  userId: number
  onDelete?: (postId: number, userId: number) => void
  openPost?: (postId: number, userId: number) => void
  displayAsListItem?: boolean
  editingEnabled?: boolean
}

export const Post: FC<PostProps> = memo(
  ({
    body,
    postId,
    onDelete,
    openPost,
    title,
    userId,
    username,
    displayAsListItem,
    editingEnabled,
  }) => {
    const handleOnDelete = () => {
      if (!onDelete) {
        return
      }
      onDelete(postId, userId)
    }

    const handleOpenPost = () => {
      if (!openPost) {
        return
      }
      openPost(postId, userId)
    }

    return (
      <PostContainer elevation={3}>
        {username && <PostAuthor variant="body2">{username}</PostAuthor>}
        <PostHeader>
          <PostTitle variant="h6">{title}</PostTitle>
          {editingEnabled && !!onDelete && (
            <DeleteIconButton
              aria-label={`delete-${postId}`}
              onClick={handleOnDelete}
            >
              <DeleteIcon sx={{ color: "#F04438" }} />
            </DeleteIconButton>
          )}
        </PostHeader>
        <PostBody variant="body1">{body}</PostBody>
        {displayAsListItem ? (
          !!openPost && <Button onClick={handleOpenPost}>See full post</Button>
        ) : (
          <CommentsContainer>
            <CommentsList postId={postId} />
          </CommentsContainer>
        )}
      </PostContainer>
    )
  },
)

const PostContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}))

const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}))

const PostAuthor = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}))

const PostBody = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const CommentsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
}))

const PostHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}))
