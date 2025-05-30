'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if the user has the 'therapist' role
        if (data.user && data.user.role === "therapist") {
          Cookies.set("peakspeak-token", data.token, { path: '/' });
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 100); // delay in milliseconds

        } else {
          setError("Only therapists have access to the dashboard.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold text-bright">
          Login to Your Account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                  placeholder="••••••••"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-bright hover:bg-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-bright hover:text-white"
          >
            Sign up
          </Link>
          <br />
          <Link
            href="/forgot"
            className="font-medium text-bright hover:text-white"
          >
            Forgot password
          </Link>
        </p>
      </div>
    </main>
  );
}
