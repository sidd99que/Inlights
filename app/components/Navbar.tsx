// app/components/Navbar.tsx
'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-semibold">
          <Link href="/">My App</Link>
        </div>

        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link href="/profile" className="text-white hover:text-yellow-400 transition duration-300">
            Profile
          </Link>
          <Link href="/posts" className="text-white hover:text-yellow-400 transition duration-300">
            Posts
          </Link>
          <Link href="/auth/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
