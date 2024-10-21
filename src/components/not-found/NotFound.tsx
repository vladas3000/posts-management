import { Paper, styled, Typography } from "@mui/material"
import type { FC } from "react"
import { memo } from "react"

export interface NotFoundProps {
  title: string
  message: string
}

export const NotFound: FC<NotFoundProps> = memo(({ message, title }) => {
  return (
    <NotFoundContainer elevation={3}>
      <NotFoundText variant="h6">{title}</NotFoundText>
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </NotFoundContainer>
  )
})

const NotFoundContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  marginTop: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}))

const NotFoundText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}))
