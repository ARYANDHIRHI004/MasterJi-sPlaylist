import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";
import Welcome from "./pages/Welcome";
import LoginUser from "./pages/LoginUser";
import Callback from "./components/Callback";
import authUserStore from "./stores/authUserStore";
import { LoaderCircleIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const accessToken = localStorage.getItem("access_token");
  const { authUser, checkingAuth, getCurrenUser} = authUserStore();


  useEffect(() => {
    getCurrenUser();
  }, [getCurrenUser]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <LoaderCircleIcon className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div className=".no-scrollbar">
      <Toaster />
      <Routes key={accessToken}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={!authUser ? <Welcome />:<DashBoard />} />
          <Route
            path="/login"
            element={!authUser ? <LoginUser /> : <Navigate to={"/"} />}
          />
        </Route>
          <Route path="/callback" element={<Callback />} />
      </Routes>
    </div >
  );
};

export default App;
