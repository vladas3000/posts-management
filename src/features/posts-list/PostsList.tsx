import { List } from "@mui/material"
import type { FC } from "react"
import { memo, useCallback, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  deletePost,
  getUserPosts,
  selectPosts,
  selectPostsByUserId,
} from "../../app/reducers"
import { Post } from "../post/Post"
import { useNavigate } from "react-router-dom"
import { EmptyList } from "../../components"

export interface PostsListProps {
  userId: number
  postsDisplayLimit?: number
  editingEnabled?: boolean
}

export const PostsList: FC<PostsListProps> = memo(
  ({ userId, postsDisplayLimit, editingEnabled }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const postsIds = useAppSelector(selectPostsByUserId(userId))
    const posts = useAppSelector(selectPosts)

    useEffect(() => {
      dispatch(getUserPosts(userId))
    }, [dispatch, userId])

    const limitedPostsIds = useMemo(() => {
      if (!postsIds) {
        return []
      }

      return postsDisplayLimit ? postsIds.slice(0, postsDisplayLimit) : postsIds
    }, [postsIds, postsDisplayLimit])

    const handleOnDelete = useCallback(
      (postId: number, userId: number) => {
        dispatch(deletePost({ postId, userId }))
      },
      [dispatch],
    )

    const navigateToPost = useCallback(
      (postId: number, userId: number) => {
        navigate(`/users/${userId}/posts/${postId}`)
      },
      [navigate],
    )

    const renderPost = (postId: number) => {
      const post = posts[postId]

      if (!post) {
        return <></>
      }

      return (
        <Post
          key={postId}
          postId={postId}
          onDelete={handleOnDelete}
          openPost={navigateToPost}
          body={post.body}
          title={post.title}
          userId={userId}
          displayAsListItem
          editingEnabled={editingEnabled}
        />
      )
    }

    return (
      <List>
        {limitedPostsIds.length > 0 ? (
          limitedPostsIds.map(renderPost)
        ) : (
          <EmptyList message="No posts yet." />
        )}
      </List>
    )
  },
)
