import type { FC } from "react"
import { memo, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container, Link, Skeleton } from "@mui/material"
import { getUser, selectUserById } from "../../app/reducers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { UserPosts } from "../../features"
import { NotFound } from "../../components"

export interface UserPageProps {}

export const UserPage: FC<UserPageProps> = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId } = useParams<{ userId: string }>()

  const userIdNumber = userId ? parseInt(userId, 10) : undefined

  const user = useAppSelector(selectUserById(userIdNumber))
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    if (userIdNumber) {
      await dispatch(getUser(userIdNumber))
    }
    setIsLoading(false)
  }, [dispatch, userIdNumber])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const returnToDashboard = () => {
    navigate("/")
  }

  const renderUserPosts = () => {
    if (!user) {
      return (
        <NotFound
          title="User Not Found"
          message="The user you are looking for does not exist."
        />
      )
    }

    return <UserPosts user={user} editingEnabled />
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={returnToDashboard}
          sx={{ mb: 2, cursor: "pointer", display: "block" }}
        >
          Return to Dashboard
        </Link>
        {isLoading ? (
          <>
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </>
        ) : (
          renderUserPosts()
        )}
      </Box>
    </Container>
  )
})
