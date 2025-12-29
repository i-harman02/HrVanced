import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log('🔥 loginSuccess action fired', action.payload)

      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

  
    },
    logout: (state) => {
      console.log('🚪 logout action fired')

      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logout } = userSlice.actions
export default userSlice.reducer
