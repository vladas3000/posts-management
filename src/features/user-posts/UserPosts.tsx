import { Box, Button, Paper, styled, Typography } from "@mui/material"
import type { FC } from "react"
import { memo, useCallback, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { createPost } from "../../app/reducers"
import { PostsList } from "../posts-list/PostsList"
import { AddPostModal } from "./components/AddPostModal"
import { useNavigate } from "react-router-dom"
import type { User } from "../../types/user"

export interface UserPostsProps {
  postsDisplayLimit?: number
  editingEnabled?: boolean
  user: User
}

export const UserPosts: FC<UserPostsProps> = memo(
  ({ user, postsDisplayLimit, editingEnabled }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = useCallback(() => setIsModalOpen(true), [])
    const handleCloseModal = useCallback(() => setIsModalOpen(false), [])

    const displayShowMorePostsButton = postsDisplayLimit !== undefined

    const addPost = useCallback(
      (title: string, body: string) => {
        dispatch(
          createPost({
            title,
            body,
            userId: user.id,
          }),
        )
      },
      [dispatch, user.id],
    )

    const navigateToUserPosts = () => {
      navigate(`/users/${user.id}/posts`)
    }

    return (
      <UserPostsContainer>
        <UserHeader>
          <UserName variant="h4">{user.username}</UserName>
          {editingEnabled && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              aria-label={"open-add-post-modal"}
            >
              Add Post
            </Button>
          )}
        </UserHeader>
        <PostsList
          userId={user.id}
          postsDisplayLimit={postsDisplayLimit}
          editingEnabled={editingEnabled}
        />
        {displayShowMorePostsButton && (
          <Button onClick={navigateToUserPosts}>
            Manage posts by {user.username}
          </Button>
        )}
        {editingEnabled && (
          <AddPostModal
            userName={user.username}
            open={isModalOpen}
            onClose={handleCloseModal}
            onAddPost={addPost}
          />
        )}
      </UserPostsContainer>
    )
  },
)

const UserPostsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: "#FAFAFA",
  boxShadow: theme.shadows[3],
}))

const UserHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}))

const UserName = styled(Typography)(() => ({
  fontWeight: "bold",
}))
