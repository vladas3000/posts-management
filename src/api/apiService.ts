import axios from "axios"
import type { User } from "../types/user"
import type { Post } from "../types/post"
import type { Comment } from "../types/comment"
import { BASE_URL } from "../config/config"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const fetchPostComments = async (postId: number) => {
  try {
    const response = await axiosInstance.get<Comment[]>(
      `/posts/${postId}/comments`,
    )

    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export const fetchUserPosts = async (userId: number) => {
  try {
    const response = await axiosInstance.get<Post[]>(`/users/${userId}/posts`)

    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get<User[]>("/users")

    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export const fetchUser = async (userId: number) => {
  try {
    const response = await axiosInstance.get<User>(`/users/${userId}`)

    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export const createPost = async (body: {
  title: string
  body: string
  userId: number
}) => {
  try {
    const response = await axiosInstance.post<Post>("/posts", body)

    return response.data
  } catch (error) {
    console.error("Error creating post:", error)
    throw error
  }
}

export const fetchPost = async (postId: number) => {
  try {
    const response = await axiosInstance.get<Post>(`/posts/${postId}`)

    return response.data
  } catch (error) {
    console.error("Error fetching post:", error)
    throw error
  }
}

export const deletePost = async (postId: number) => {
  try {
    await axiosInstance.delete(`/posts/${postId}`)
  } catch (error) {
    console.error("Error deleting post:", error)
    throw error
  }
}
