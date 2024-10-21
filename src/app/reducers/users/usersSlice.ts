import { createAppSlice } from "../../createAppSlice"
import type { RootState } from "../../store"
import type { UsersSliceState } from "./types"
import { createGetUserAction, createGetUsersListAction } from "./usersActions"

const initialState: UsersSliceState = {
  users: {
    byId: {},
    ids: [],
  },
}

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    getUsersList: createGetUsersListAction(create),
    getUser: createGetUserAction(create),
  }),
})

export const { getUsersList, getUser } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.users
export const selectUserById = (id?: number) => (state: RootState) =>
  id ? state.users.users.byId[id] : undefined
