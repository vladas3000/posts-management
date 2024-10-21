import { setupServer } from "msw/node"
import { apiMocks } from "../../testUtils/apiMocks"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { UserPage } from "./UserPage"
import { store } from "../../app/store"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const USER_ID = 1

const server = setupServer(
  apiMocks.createPost({
    id: 3,
  }),
  apiMocks.fetchUser({
    name: "Test User",
    username: "testuser",
  }),
  apiMocks.fetchUserPosts([
    {
      id: 1,
      title: "Post Title 1",
      body: "Post Body 1",
      userId: USER_ID,
    },
    {
      id: 2,
      title: "Post Title 2",
      body: "Post Body 2",
      userId: USER_ID,
    },
  ]),
  apiMocks.deletePost(),
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  mockNavigate.mockReset()
})
afterAll(() => server.close())

const renderUserPage = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/users/${USER_ID}/posts`]}>
        <Routes>
          <Route path="/users/:userId/posts" element={<UserPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe("UserPage", () => {
  test("should render user posts", async () => {
    renderUserPage()

    expect(screen.queryByText("Post Title 1")).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText("Post Title 1")).toBeInTheDocument()
    })

    expect(screen.getByText("Post Title 2")).toBeInTheDocument()
  })

  test("should delete user posts", async () => {
    renderUserPage()

    await waitFor(() => {
      expect(screen.getByText("Post Title 1")).toBeInTheDocument()
    })

    const deleteButton = screen.getByLabelText("delete-1")
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText("Post Title 1")).not.toBeInTheDocument()
    })

    expect(screen.getByText("Post Title 2")).toBeInTheDocument()
  })

  test("should create post", async () => {
    renderUserPage()

    await waitFor(() => {
      expect(
        screen.queryByText("Add new post for testuser"),
      ).not.toBeInTheDocument()
    })

    const openAddPostModalButton = screen.getByLabelText("open-add-post-modal")
    fireEvent.click(openAddPostModalButton)

    expect(screen.getByText("Add new post for testuser")).toBeInTheDocument()

    const titleInput = screen.getByLabelText("Post Title")
    fireEvent.change(titleInput, { target: { value: "New Post Title" } })

    const bodyInput = screen.getByLabelText("Post Body")
    fireEvent.change(bodyInput, { target: { value: "New Post Body" } })

    const addPostButton = screen.getByLabelText("add-post")
    fireEvent.click(addPostButton)

    await waitFor(() => {
      expect(
        screen.queryByText("Add new post for testuser"),
      ).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText("New Post Title")).toBeInTheDocument()
    })
  })
})
