import { create } from "zustand";
import axiosInstance from "../services/axios";
import toast from "react-hot-toast";

const authUserStore = create((set) => ({
  authUser: null,
  checkingAuth: false,
  isLogingOutUser: false,
  accessToken:null,

  getCurrenUser: async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("No access token yet.");
      return;
    }
    console.log(accessToken)
    try {
      set({ checkingAuth: true });
      const res = await axiosInstance.get("/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ authUser: res.data, checkingAuth: false });
      toast.success(res.data?.message || "User fetched successfully");
    } catch (error) {
      set({ checkingAuth: false });
    }
  },

  logoutUser: async () => {
    try {
      set({ isLogingOutUser: true });
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("spotify_code_verifier");
      set({ authUser: null, isLogingOutUser: false });
      toast.success("User Logged out");
    } catch (error) {
      set({ isLogingOutUser: false });
      toast.error("User Loggedout failed");
    }
  },
}));

export default authUserStore;
