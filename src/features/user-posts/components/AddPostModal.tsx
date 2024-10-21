import type { FC } from "react"
import { memo, useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material"

export interface AddPostModalProps {
  userName: string
  open: boolean
  onClose: () => void
  onAddPost: (title: string, body: string) => void
}

export const AddPostModal: FC<AddPostModalProps> = memo(
  ({ onAddPost, onClose, open, userName }) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    useEffect(() => {
      if (!open) {
        setTitle("")
        setBody("")
        setTitleError(false)
        setBodyError(false)
      }
    }, [open])

    const handleSubmitPost = () => {
      setTitleError(false)
      setBodyError(false)

      if (!title) setTitleError(true)
      if (!body) setBodyError(true)

      if (title && body) {
        onAddPost(title, body)
        onClose()
      }
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleError(false)
      setTitle(e.target.value)
    }

    const onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBodyError(false)
      setBody(e.target.value)
    }

    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add new post for {userName}</DialogTitle>
        <DialogContent>
          <Box component="form">
            <TextField
              autoFocus
              margin="dense"
              variant="outlined"
              id="title"
              label="Post Title"
              type="text"
              fullWidth
              value={title}
              onChange={onTitleChange}
              error={titleError}
              helperText={titleError ? "Title is required" : ""}
            />
            <TextField
              variant="outlined"
              margin="dense"
              id="body"
              label="Post Body"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={body}
              onChange={onBodyChange}
              error={bodyError}
              helperText={bodyError ? "Body is required" : ""}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPost}
            color="primary"
            aria-label={"add-post"}
          >
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    )
  },
)
