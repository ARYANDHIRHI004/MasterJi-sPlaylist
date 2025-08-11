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
  const { authUser, checkingAuth, getCurrenUser, accessToken } = authUserStore();

  useEffect(() => {
    getCurrenUser();
  }, [getCurrenUser]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircleIcon className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={authUser ? <DashBoard /> : <Welcome />} />
          <Route
            path="/login"
            element={!authUser ? <LoginUser /> : <Navigate to={"/"} />}
          />
          <Route path="/callback" element={<Callback />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
