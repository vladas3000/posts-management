import type { FC } from "react"
import { memo, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUsersList, selectUsers } from "../../app/reducers"
import { UserPosts } from "../../features"
import { Box, Container } from "@mui/material"
import { EmptyList } from "../../components"

export interface HomePageProps {}

export const HomePage: FC<HomePageProps> = memo(() => {
  const dispatch = useAppDispatch()
  const { byId, ids } = useAppSelector(selectUsers)

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  const renderUserPosts = (userId: number) => {
    const user = byId[userId]
    if (!user) {
      return <></>
    }
    return (
      <UserPosts
        key={userId}
        user={user}
        postsDisplayLimit={1}
        editingEnabled={false}
      />
    )
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2 }}>
        {ids.length > 0 ? (
          ids.map(renderUserPosts)
        ) : (
          <EmptyList message="No users yet." />
        )}
      </Box>
    </Container>
  )
})
