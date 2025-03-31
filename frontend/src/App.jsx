import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard/Dashboard"
import Favorites from "./pages/Dashboard/Favorites"
import MyNotes from "./pages/Dashboard/MyNotes"
import Profile from "./pages/Dashboard/Profile"
import Remainder from "./pages/Dashboard/Remainder"
import SharedNotes from "./pages/Dashboard/SharedNotes"
import TodoList from "./pages/Dashboard/TodoList"
import Trash from "./pages/Dashboard/Trash"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import OTP from "./pages/OTP"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword"
import PrivateRoute from "./components/PrivateRoute"
import NotFoundPage from "./pages/NotFoundPage "
import NotePage from "./pages/NotePage"

function App() {

  return (
    <div className="h-screen overflow-auto">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/updatePassword/:token" element={<UpdatePassword />} />
        <Route path="/note/:noteId" element={<NotePage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<PrivateRoute> <Dashboard /> </PrivateRoute>} >
          <Route path="/dashboard/my-notes" element={<MyNotes />} />
          <Route path="/dashboard/sharedNotes" element={<SharedNotes />} />
          <Route path="/dashboard/todoList" element={<TodoList />} />
          <Route path="/dashboard/reminders" element={<Remainder />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
          <Route path="/dashboard/trash" element={<Trash />} />
          <Route path="/dashboard/my-profile" element={<Profile />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
