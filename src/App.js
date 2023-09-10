import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserList from "./features/users/UserList"
import AddUser from "./features/users/AddUser"
import EditUser from "./features/users/EditUser"

const App = () => {
	return (
		<BrowserRouter>
			<>
				<Routes>
					<Route exact path="/" element={<UserList />} />
					<Route path="/add-user" element={<AddUser />} />
					<Route path="/edit-user" element={EditUser} />
				</Routes>
			</>
		</BrowserRouter>
	)
}

export default App
