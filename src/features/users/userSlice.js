import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users")
	const users = await response.json()
	return users
})

const usersSlice = createSlice({
	name: "users",
	initialState: {
		entities: [],
		loading: false,
	},

	extraReducers: {
		[fetchUsers.pending]: (state, action) => {
			state.loading = true
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.loading = false
			if (state.entities.length === 0) {
				state.entities = [...state.entities, ...action.payload]
			}
		},
		[fetchUsers.rejected]: (state, action) => {
			state.loading = false
		},
	},

	reducers: {
		userAdded(state, action) {
			state.entities.push(action.payload)
		},
		userUpdated(state, action) {
			const { id, name, email } = action.payload
			const existingUser = state.entities.find((user) => user.id === id)
			if (existingUser) {
				existingUser.name = name
				existingUser.email = email
			}
		},
		userDeleted(state, action) {
			const { id } = action.payload
			const existingUser = state.entities.find((user) => user.id === id)
			if (existingUser) {
				state.entities = state.entities.filter((user) => user.id !== id)
			}
		},
	},
})

console.log(usersSlice.actions.userAdded, "test user slice actions")

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions

export default usersSlice.reducer
