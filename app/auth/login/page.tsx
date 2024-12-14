"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient"; // Make sure this is correctly configured

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Error state
    const [loading, setLoading] = useState(false); // Loading state

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state

        // Attempt to sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setLoading(false); // Stop loading
            setError(error.message); // Display error message
        } else {
            // Check if the user’s email is confirmed
            const session = await supabase.auth.getSession();

            const isEmailConfirmed = session.data?.session?.user?.email_confirmed_at;

            if (!isEmailConfirmed) {
                setLoading(false); // Stop loading
                setError("Please confirm your email address before signing in.");
                return;
            }

            // Redirect to the protected route after successful sign-in
            router.push("/protected-route");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border sm:w-full dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>

                    {/* Form */}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
                        {error && <div className="text-red-500 text-sm">{error}</div>} {/* Display error message */}

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            disabled={loading} // Disable while loading
                        >
                            {loading ? "Signing In..." : "Sign in"}
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
