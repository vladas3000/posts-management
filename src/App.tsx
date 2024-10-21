import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, NotFoundPage, UserPage, PostPage } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:userId/posts" element={<UserPage />} />
        <Route path="/users/:userId/posts/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
