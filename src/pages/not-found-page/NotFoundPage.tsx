import type { FC } from "react"
import { Button, Container, Typography, Box, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <ContentContainer maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sorry, the page you’re looking for doesn’t exist. It might have been
          moved or deleted.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 4 }}
        >
          Go to Home
        </Button>
      </Box>
    </ContentContainer>
  )
}

const ContentContainer = styled(Container)(() => ({
  textAlign: "center",
  marginTop: "50px",
}))
