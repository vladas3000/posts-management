import type { ReducerCreators } from "@reduxjs/toolkit"
import type { UsersSliceState } from "./types"
import { fetchUser, fetchUsers } from "../../../api/apiService"
import { normalizeData } from "../../../utils/normalizeData"

export const createGetUsersListAction = (
  create: ReducerCreators<UsersSliceState>,
) => {
  return create.asyncThunk(
    async () => {
      const users = await fetchUsers()

      return normalizeData(users)
    },
    {
      fulfilled: (state, action) => {
        state.users = action.payload
      },
    },
  )
}

export const createGetUserAction = (
  create: ReducerCreators<UsersSliceState>,
) => {
  return create.asyncThunk(
    async (userId: number) => {
      const user = await fetchUser(userId)

      return user
    },
    {
      fulfilled: (state, action) => {
        state.users.byId = {
          ...state.users.byId,
          [action.payload.id]: action.payload,
        }
      },
    },
  )
}
