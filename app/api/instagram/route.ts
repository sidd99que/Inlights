// app/api/instagram/route.ts
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const fetchInstagramPosts = async () => {
  const userId = 'your_instagram_user_id';  // Replace with your Instagram user ID
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
};

export async function GET() {
  return fetchInstagramPosts();
}
