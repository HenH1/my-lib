import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { User } from '../../models/User'

// Define a type for the slice state
interface loggedUserState {
  value: User | undefined
}

// Define the initial state using that type
const initialState: loggedUserState = {
  value: undefined,
}

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoggedUser: (state, action: PayloadAction<User | undefined>) => {
      state.value = action.payload
    },
  },
})

export const { setLoggedUser } = loggedUserSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedUser = (state: RootState) => state.loggedUser.value

export default loggedUserSlice.reducer