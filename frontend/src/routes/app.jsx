import { BrowserRouter, Route, Routes } from "react-router-dom";
import Meetings from "../Pages/Meetings.jsx";
import MeetingsHistory from "../Pages/MeetingsHistory.jsx";
import Rooms from "../Pages/Rooms.jsx";
import Layout from "../components/Layout.jsx";
import SignupForm from "../Pages/SignupForm.jsx";
import LoginForm from "../Pages/LoginForm.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Rooms />} />
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/:room/meetings" element={<Meetings />} />
          <Route path="history" element={<MeetingsHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
