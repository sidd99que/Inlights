'use client';

import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [isLinked, setIsLinked] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    // Build the Instagram OAuth URL
    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!;
    const scope = 'user_profile,user_media'; // Permissions needed

    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    setAuthUrl(url);

    // Check if user has linked Instagram (optional logic based on your database)
    const checkUserLink = async () => {
      const response = await fetch('/api/instagram/status');
      const data = await response.json();
      if (data.isLinked) {
        setIsLinked(true);
        setUserDetails(data.userDetails);
      }
    };
    checkUserLink();
  }, []);

  const handleLinkInstagram = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      // Send code to API route to exchange for token
      const response = await fetch('/api/instagram/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (data.access_token) {
        // Save token in your database
        await fetch('/api/instagram/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: data.access_token,
            userId: data.user_id,
          }),
        });

        setIsLinked(true);
        setUserDetails({ userId: data.user_id });
      }
    }
  };

  // Handle OAuth redirect
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      handleLinkInstagram();
    }
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {isLinked ? (
        <div>
          <h2 className="text-lg font-semibold">Instagram Linked</h2>
          <p>User ID: {userDetails?.userId}</p>
          <p>Account linked successfully!</p>
        </div>
      ) : (
        <div>
          <p className="mb-4">You haven't linked your Instagram account yet.</p>
          <a
            href={authUrl}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Link Instagram Account
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
