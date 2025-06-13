'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { FiLock } from 'react-icons/fi';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrors({}); // Clear previous field errors
    setMessage(null); // Clear previous global messages
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    // Simulate API response (random success/failure for demonstration)
    // In a real app, this would be an actual API call.
    const isSuccess = Math.random() > 0.3; // Simulate a 70% success rate

    if (isSuccess) {
      setMessage({
        type: 'success',
        text: `If an account exists for ${formData.email}, a password reset link has been sent. Please check your inbox (and spam folder).`,
      });
      setFormData({ email: '' }); // Clear form on success
    } else {
      setMessage({
        type: 'error',
        text: 'Failed to send reset link. The email address might not be registered or there was a server error. Please try again later.',
      });
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) { // Clear error for the field being edited
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined,
        }));
    }
    if (message) { // Clear global message when user starts typing again
        setMessage(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Image (UI kept identical) */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('/[countryCode]/(auth)/auth/forgot-password/forgot-password.png')` }}
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

      {/* Right Panel - Forgot Password Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center justify-center text-gray-600">
            <FiLock className="mr-2 text-xl" />
            <span>Secure Connection</span>
          </div>
          <h2 className="text-4xl font-bold text-center text-gray-800">Forgot Your Password?</h2>
          <p className="text-center text-gray-500">
            No problem! Enter the email address associated with your account, and we&apos;ll send you a link to reset your password.
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g., yourname@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading} // Disable input during loading
                  className={`mt-1 w-full px-4 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isLoading ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-500 text-sm">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/in/auth/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Display Success/Error Messages */}
          {message && (
            <div
              className={`text-sm p-3 rounded-md border ${
                message.type === 'success'
                  ? 'text-green-700 bg-green-50 border-green-300'
                  : 'text-red-700 bg-red-50 border-red-300'
              }`}
              role={message.type === 'error' ? 'alert' : 'status'}
            >
              {message.text}
            </div>
          )}

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/in/auth/create-account" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;