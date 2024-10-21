import { Box, Container, Link, Skeleton } from "@mui/material"
import type { FC } from "react"
import { memo, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Post } from "../../features/post/Post"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deletePost,
  getPost,
  getUser,
  selectPostById,
  selectUserById,
} from "../../app/reducers"
import { NotFound } from "../../components"

export interface PostPageProps {}

export const PostPage: FC<PostPageProps> = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId, postId } = useParams<{ userId: string; postId: string }>()

  const postIdNumber = postId ? parseInt(postId, 10) : undefined
  const userIdNumber = userId ? parseInt(userId, 10) : undefined

  const [isLoading, setIsLoading] = useState(true)

  const user = useAppSelector(selectUserById(userIdNumber))
  const post = useAppSelector(selectPostById(postIdNumber))

  const fetchPostDetails = useCallback(async () => {
    if (postIdNumber) {
      await dispatch(getPost(postIdNumber))
    }

    if (userIdNumber) {
      await dispatch(getUser(userIdNumber))
    }

    setIsLoading(false)
  }, [dispatch, postIdNumber, userIdNumber])

  useEffect(() => {
    fetchPostDetails()
  }, [fetchPostDetails])

  const handleOnDelete = useCallback(
    async (postId: number, userId: number) => {
      await dispatch(deletePost({ postId, userId }))
      navigate(`/users/${userId}/posts`)
    },
    [dispatch, navigate],
  )

  const returnToUserPosts = () => {
    if (userIdNumber) {
      navigate(`/users/${userId}/posts`)
      return
    }
    navigate("/")
  }

  const returnToUserPostsLabel = user?.username
    ? `Return to ${user.username}'s posts`
    : "Return to posts"

  const renderPost = () => {
    if (user && post) {
      return (
        <Post
          key={postId}
          postId={post.id}
          onDelete={handleOnDelete}
          body={post.body}
          title={post.title}
          userId={post.userId}
          username={user.username}
          editingEnabled
        />
      )
    }
    return (
      <NotFound
        title="Post Not Found"
        message="The post you are looking for does not exist."
      />
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={returnToUserPosts}
          sx={{ mb: 2, cursor: "pointer", display: "block" }}
        >
          {userIdNumber ? returnToUserPostsLabel : "Return to Dashboard"}
        </Link>
        {isLoading ? <Skeleton height={200} /> : renderPost()}
      </Box>
    </Container>
  )
})
