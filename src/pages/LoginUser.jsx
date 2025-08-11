import React from "react";

const LoginUser = () => {
    
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = "http://127.0.0.1:5173/callback"; // Match your Spotify app settings

  function generateRandomString(length) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join(
      ""
    );
  }

  async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Digest;
  }

  const scopes = [
    "user-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-top-read",
  ];

  async function redirectToSpotifyAuth() {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("spotify_code_verifier", codeVerifier); // Save for later

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      redirect_uri: redirectUri,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <button
          onClick={redirectToSpotifyAuth}
          className="bg-spotify-color px-5 py-3 rounded-lg text-white font-[500]"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
