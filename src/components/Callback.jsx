import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = "http://127.0.0.1:5173/callback"; // Must match what you registered

  async function getAccessTokenFromCode(code) {
    const codeVerifier = localStorage.getItem("spotify_code_verifier");

    const params = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_description || "Failed to get access token");
    }

    return data; // includes access_token and refresh_token
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      setError("Authorization code not found.");
      return;
    }

    // 👇 Call the function to exchange code for access token
    getAccessTokenFromCode(code)
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("expires_in", data.expires_in);
        // Redirect to home or dashboard
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to get access token.");
      });
  }, []);

  return (
    <div>
      <h2>Authorizing with Spotify...</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Callback;
