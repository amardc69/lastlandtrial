import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { FiLock } from 'react-icons/fi';
import { LoginForm } from './_components/LoginForm'; // Adjust path as needed
import { randomBytes, createHash } from 'crypto';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  params: { countryCode: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ params, searchParams }: LoginPageProps) => {
  const fixedRedirectUri = 'http://localhost:3000/in/dashboard';

  const requiredParams = ['session_id', 'csrf_token', 'state', 'client_id', 'nonce', 'redirect_uri'];

  const hasAllParams = requiredParams.every(p => !!searchParams[p]);

  if (!hasAllParams) {
    const { countryCode } = params;
    const newUrl = new URL(`/${countryCode}/auth/login`, 'http://localhost:3000'); // Base is a placeholder

    const newParams = {
        // Technique 1: Cryptographically secure random bytes converted to a hex string.
        session_id: randomBytes(32).toString('hex'),

        // Technique 2: Secure random bytes converted to a URL-safe base64 string.
        csrf_token: randomBytes(24).toString('base64url'),

        // Technique 3: A SHA256 hash of the current high-resolution time and a random number.
        state: createHash('sha256').update(process.hrtime.bigint().toString() + Math.random().toString()).digest('hex'),

        // Technique 4 (Updated): A standard Version 4 UUID.
        client_id: crypto.randomUUID(),

        // Technique 5: The current nanosecond-precision timestamp converted to a base36 string.
        nonce: process.hrtime.bigint().toString(36),
        
        // Static URI: The redirect_uri is always the fixed value.
        redirect_uri: fixedRedirectUri
    };

    Object.entries(newParams).forEach(([key, value]) => {
        newUrl.searchParams.set(key, value);
    });
    
    redirect(newUrl.pathname + newUrl.search);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('/[countryCode]/(auth)/auth/login/login.webp')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80"></div>
        <div className="relative z-10 p-12 flex flex-col justify-end h-full">
          <div className="flex items-center justify-center">
            <Image src="/[countryCode]/(auth)/auth/common/logo.png" alt="Logo" width={80} height={80} />
            <h1 className="text-4xl font-angelos text-white ml-12">
              Last Land
            </h1>
          </div>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-center text-gray-600">
            <FiLock className="mr-2 text-xl" />
            <span>Secure Connection</span>
          </div>
          <h2 className="text-4xl font-bold text-center text-gray-800">Sign In</h2>
          <p className="text-center text-gray-500">
            Enter your credentials to access your account
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
