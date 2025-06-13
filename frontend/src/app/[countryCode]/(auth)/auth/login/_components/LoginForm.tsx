'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type CheckedState = boolean | 'indeterminate';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Email or phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      signIn('credentials', {
        redirect: true,
        email: formData.username,
        password: formData.password,
        callbackUrl: '/dashboard',
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRememberMeChange = (checked: CheckedState) => {
    setRememberMe(checked === true);
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email address or Phone number
            </label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Email address or Phone number"
              value={formData.username}
              onChange={handleInputChange}
              required
              className={`mt-1 w-full px-4 py-3 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <p id="username-error" className="mt-1 text-red-500 text-sm">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center justify-center focus:outline-none"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500 h-5 w-5" />
                ) : (
                  <AiOutlineEye className="text-gray-500 h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-red-500 text-sm">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        {/* Remember Me Checkbox and Forgot Password Link */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={handleRememberMeChange}
            />
            <span className="text-gray-600 text-sm select-none">Remember me</span>
          </label>
          <Link href="/in/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Sign In
        </Button>
      </form>

      {/* OR Separator */}
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex flex-col space-y-4 mt-6">
        <Button
          variant="outline"
          className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 flex items-center justify-center focus:ring-4 focus:ring-gray-200 transition duration-200"
          onClick={() => signIn('google', { callbackUrl: '/in/dashboard' })}
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 flex items-center justify-center group focus:ring-4 focus:ring-gray-200 transition duration-200"
          onClick={() => signIn('apple', { callbackUrl: '/in/dashboard' })}
        >
          <FaApple className="mr-2 text-xl text-gray-700 group-hover:text-black transition-colors duration-200" />
          Sign in with Apple
        </Button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-gray-600 mt-8">
        Don&apos;t have an account?{' '}
        <Link href="/in/auth/create-account" className="text-blue-600 hover:underline">
          Create Account
        </Link>
      </p>
    </>
  );
};