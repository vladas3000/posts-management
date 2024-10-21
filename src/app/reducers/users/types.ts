import type { User } from "../../../types/user"

export interface UsersSliceState {
  users: {
    byId: Record<number, User | undefined>
    ids: number[]
  }
}
