import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CustomRoute from "./Route";

//pages
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import JobPost from "./pages/home/JobPost";
import AboutUs from "./pages/home/AboutUs";
import ContactUs from "./pages/home/ContactUs";
import Login from "./pages/home/Login";
import SignUp from "./pages/home/SignUp";
import User from "./pages/admin/User";

import PrivetRoute from "./pages/components/PrivetRoute";
import AuthRoute from "./pages/components/AuthRoute";
import Chat from "./pages/admin/Chat";
import Application from "./pages/admin/Application";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<CustomRoute showNavAndFooter={true} />} >
          {/* home */}
          <Route index element={<Home />} />
          <Route path="/job/:id" element={<JobPost />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="" element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route path="" element={<PrivetRoute />}>
            <Route path="/user/:id" element={<User />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/applications/:id" element={<Application />} />
          </Route>
          <Route path="/error" element={<Error />} />
        </Route>
        
        
  
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
