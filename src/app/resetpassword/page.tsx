'use client';
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {jwtDecode} from "jwt-decode"; // Use default import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Check token expiry on component mount
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        // exp is in seconds; compare with current time in seconds.
        if (decoded.exp < Date.now() / 1000) {
          setIsTokenExpired(true);
        }
      } catch (err) {
        console.error("Error decoding token", err);
        setIsTokenExpired(true);
      }
    }
  }, [token]);

  // Render error message if token is missing or expired.
  if (!token || isTokenExpired) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary">
        <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
          <h2 className="text-center text-2xl font-bold text-bright">
            Invalid or Expired Token
          </h2>
          <p className="text-center text-sm text-gray-400">
            The password reset token is missing or has expired. Please request a new password reset.
          </p>
        </div>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError("");

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match");
      setStatus('error');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/resetpassword?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password: formData.new_password }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ new_password: "", confirm_password: "" });
        // Redirect to login page after a brief delay.
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const errorData = await response.json();
        setStatus('error');
        setError(errorData.message || "Password reset failed. The token may have expired.");
      }
    } catch (err) {
      console.error("Error during password reset:", err);
      setError("An error occurred");
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold text-bright">
          Reset Password
        </h2>
        <p className="text-center text-sm text-gray-400">
          Enter your new password.
        </p>

        {status === "success" && (
          <p className="text-green-500 text-center text-sm">
            Password reset successfully. Redirecting to login...
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* New Password Field with Eye Icon */}
            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-white">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new_password"
                  name="new_password"
                  type={passwordVisible ? "text" : "password"}
                  required
                  value={formData.new_password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>
            {/* Confirm Password Field (no icon added; can add similar if desired) */}
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={ confirmPasswordVisible ? "text" : "password"}
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-bright hover:bg-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright text-sm font-medium disabled:opacity-50"
            >
              {status === "loading" ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
