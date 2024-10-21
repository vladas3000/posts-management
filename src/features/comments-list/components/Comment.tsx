import { ListItem, Paper, styled, Typography } from "@mui/material"
import type { FC } from "react"
import { memo } from "react"

export interface CommentProps {
  body: string
  name: string
}

export const Comment: FC<CommentProps> = memo(({ body, name }) => {
  return (
    <ListItem disablePadding>
      <CommentItemContainer elevation={2}>
        <CommentAuthor variant="subtitle2">{name}</CommentAuthor>
        <Typography variant="body2">{body}</Typography>
      </CommentItemContainer>
    </ListItem>
  )
})

const CommentItemContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: "#FAFAFA",
  boxShadow: theme.shadows[1],
}))

const CommentAuthor = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(0.5),
}))
