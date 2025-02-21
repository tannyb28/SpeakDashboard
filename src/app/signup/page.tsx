// src/app/signup/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    role: 'therapist', // Default role
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Optionally, automatically log the user in
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold text-bright">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-white">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                placeholder="First Name"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-white">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
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
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm placeholder-medium text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-bright focus:border-bright sm:text-sm"
              >
                <option value="patient">Patient</option>
                <option value="therapist">Therapist</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-bright hover:bg-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-white">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-bright hover:text-white">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
