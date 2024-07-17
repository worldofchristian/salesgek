'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement login logic here
    console.log('Login attempted with:', email, password);
    // If login is successful, redirect to dashboard
    // router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-base-content text-center mb-5">
            Your team
        </h1>

        <p className='text-2xl font-semibold text-base-content text-center mb-12'>
            Internal tool
        </p>

        <form 
        onSubmit={handleSubmit} 
        className="mb-4 px-8 pb-8 pt-6 bg-base-200 rounded-3xl"
        >
          <div className="mt-6 mb-6">
            <label 
            className="mb-2 block text-xl font-semibold text-base-content" 
            htmlFor="email">
            Email
            </label>

            <input
              className="input input-bordered w-full rounded-2xl"
              id="email"
              type="email"
              placeholder="Type here"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-12">
            <label 
            className="mb-2 block text-xl font-semibold text-base-content" 
            htmlFor="password">
            Password
            </label>
            
            <input
              className="input input-bordered w-full rounded-2xl"
              id="password"
              type="password"
              placeholder="Type here"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className='flex flex-col items-center'>
                <button
                className="btn btn-primary rounded-full w-[170px]"
                type="submit"
                >
                Log in
                </button>

                <a 
                className='text-lg font-medium underline text-base-content mt-6'
                >
                Forgot password?
                </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}