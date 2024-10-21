import { http, HttpResponse } from "msw"
import type { Comment } from "../types/comment"
import type { Post } from "../types/post"
import type { User } from "../types/user"
import { BASE_URL } from "../config/config"

const fetchPostComments = (commentsList: Comment[]) => {
  return http.get(`${BASE_URL}/posts/:postId/comments`, () => {
    return HttpResponse.json(commentsList)
  })
}
const fetchUserPosts = (postsList: Post[]) => {
  return http.get(`${BASE_URL}/users/:userId/posts`, () => {
    return HttpResponse.json(postsList)
  })
}
const fetchUsers = (usersList: User[]) => {
  return http.get(`${BASE_URL}/users`, () => {
    return HttpResponse.json(usersList)
  })
}
const fetchUser = (user: Partial<User>) => {
  return http.get(`${BASE_URL}/users/:userId`, info => {
    const { userId } = info.params

    return HttpResponse.json({ id: Number(userId), ...user })
  })
}
const createPost = (post: Partial<Post>) => {
  return http.post(`${BASE_URL}/posts`, async ({ request }) => {
    const { title, body, userId } = (await request.json()) as {
      title: string
      body: string
      userId: number
    }

    return HttpResponse.json({ title, body, userId, ...post })
  })
}
const fetchPost = (post: Partial<Post>) => {
  return http.get(`${BASE_URL}/posts/:postId`, info => {
    const { postId } = info.params
    return HttpResponse.json({
      ...post,
      id: Number(postId),
    })
  })
}
const deletePost = () => {
  return http.delete(`${BASE_URL}/posts/:postId`, () => {
    return HttpResponse.json(null)
  })
}

export const apiMocks = {
  fetchPostComments,
  fetchUserPosts,
  fetchUsers,
  fetchUser,
  createPost,
  fetchPost,
  deletePost,
}
