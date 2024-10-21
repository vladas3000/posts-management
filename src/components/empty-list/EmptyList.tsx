import { Box, styled, Typography } from "@mui/material"
import type { FC } from "react"
import { memo } from "react"

export interface EmptyListProps {
  message: string
}

export const EmptyList: FC<EmptyListProps> = memo(({ message }) => {
  return (
    <NoCommentsContainer>
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </NoCommentsContainer>
  )
})

const NoCommentsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}))
