'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ForgotPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: ""});
  const [error, setError] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('success');
        setFormData({
          email: "",
        });
      } else {
        const errorData = await response.json();
        setStatus('error');
        setError(errorData.message || "Password reset failed");
      }
    } catch (err) {
      console.error("Error during forgot password:", err);
      setError("An error occurred");
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold text-bright">
          Forgot Password
        </h2>

        <p className="text-center text-sm text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {status === "success" && (
          <p className="text-green-500 text-center text-sm">
            If that email exists, a reset link has been sent.
          </p>
        )}
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
          </div>

          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-bright hover:bg-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright text-sm font-medium disabled:opacity-50"
            >
              {status === "loading" ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
