// components/InstagramAuth.tsx
import { useState } from 'react';

const InstagramAuth = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(false);

  const handleInstagramLogin = () => {
    setLoading(true);

    // The Instagram OAuth URL to authorize the app to access user data
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;

    // Redirect to Instagram OAuth URL
    window.location.href = instagramAuthUrl;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button
          onClick={handleInstagramLogin}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Link Your Instagram Account
        </button>
      )}
    </div>
  );
};

export default InstagramAuth;
