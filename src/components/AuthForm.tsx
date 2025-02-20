// src/components/AuthForm.tsx

'use client';
import React from 'react';
import { FormEvent, ReactNode } from 'react';

interface AuthFormProps {
  heading: string;
  buttonText: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthForm({ heading, buttonText, onSubmit, children, footer }: AuthFormProps) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-dark rounded-lg shadow">
      <h2 className="text-center text-2xl font-bold text-bright">{heading}</h2>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {children}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-bright hover:bg-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright text-sm font-medium"
          >
            {buttonText}
          </button>
        </div>
      </form>
      {footer}
    </div>
  );
}
