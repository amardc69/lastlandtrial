"use client";

import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
import { signIn } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clsx } from "clsx";
import { MdError } from "react-icons/md"; // Importing the error icon from React Icons

// Define the shape of the form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Define the shape of the errors object
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  apiError?: string; // To handle API-specific errors
  avatar?: string; // To handle avatar-specific errors
}

interface ToastDestructiveProps {
  title?: string;
  description?: string;
  isOpen?: boolean;
  onTryAgain?: () => void;
  onClose?: () => void;
}

export function ToastDestructive({
  title = "Uh oh! Something went wrong.",
  description = "There was a problem with your request.",
  isOpen = false,
  onTryAgain,
  onClose,
}: ToastDestructiveProps) {
  const [visible, setVisible] = useState(isOpen);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setExiting(false);
    } else {
      // Trigger exit animation before hiding
      setExiting(true);
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 300); // Match with animation duration

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleTryAgain = () => {
    if (onTryAgain) onTryAgain();
    // Animate out after pressing Try again
    setExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
      setVisible(false);
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        "fixed z-50 flex w-80 max-w-[90%] pointer-events-auto p-4 rounded-lg shadow-xl",
        "transform transition-all duration-300 ease-out",
        // Background and text styling
        "bg-gradient-to-r from-red-700 to-red-600 text-white",
        "right-6 bottom-6",
        // Animations:
        // When appearing: slide in and scale up
        // When exiting: slide slightly and fade out
        exiting
          ? "opacity-0 translate-y-3 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-start space-x-3">
          {/* Icon from React Icons */}
          <div className="flex-shrink-0 mt-0.5">
            <MdError className="w-6 h-6 text-white opacity-90" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h2 className="text-base font-semibold leading-6">{title}</h2>
            <p className="text-sm leading-5 mt-1 text-red-100">{description}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleTryAgain}
            className={clsx(
              "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md",
              "bg-white text-red-700 hover:bg-red-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white",
              "transition-colors duration-200 ease-in-out"
            )}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}


export function ToastACBNL({
  title = "Uh oh! Something went wrong.",
  description = "There was a problem with your request.",
  isOpen = false,
  onTryAgain,
  onClose,
}: ToastDestructiveProps) {
  const [visible, setVisible] = useState(isOpen);
  const [exiting, setExiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setExiting(false);
    } else {
      // Trigger exit animation before hiding
      setExiting(true);
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 300); // Match with animation duration

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  const handleTryAgainACBNL = () => {
    if (onTryAgain) onTryAgain();
    // Animate out after pressing Try again
    setExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
      setVisible(false);
    }, 300);
    router.push("/auth/login");
  };

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(
        "fixed z-50 flex w-80 max-w-[90%] pointer-events-auto p-4 rounded-lg shadow-xl",
        "transform transition-all duration-300 ease-out",
        // Background and text styling
        "bg-gradient-to-r from-red-700 to-red-600 text-white",
        "right-6 bottom-6",
        // Animations:
        // When appearing: slide in and scale up
        // When exiting: slide slightly and fade out
        exiting
          ? "opacity-0 translate-y-3 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      )}
    >
      <div className="flex flex-col w-full">
        <div className="flex items-start space-x-3">
          {/* Icon from React Icons */}
          <div className="flex-shrink-0 mt-0.5">
            <MdError className="w-6 h-6 text-white opacity-90" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <h2 className="text-base font-semibold leading-6">{title}</h2>
            <p className="text-sm leading-5 mt-1 text-red-100">{description}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleTryAgainACBNL}
            className={clsx(
              "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md",
              "bg-white text-red-700 hover:bg-red-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white",
              "transition-colors duration-200 ease-in-out"
            )}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}


const SignupPage: React.FC = () => {
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [showToastACBNL, setShowToastACBNL] = useState(false);
  

  // Steps: step 1 -> fullName, email, phone; step 2 -> password, confirmPassword
  const [step, setStep] = useState<number>(1);

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  // State for form errors
  const [errors, setErrors] = useState<FormErrors>({});

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // State for avatar upload
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // State for loading indicator during form submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State to control the AlertDialog visibility
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Ref for the file input to trigger it programmatically
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Validate step 1 fields: fullName, email, phone
   */
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Validate email or phone
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = "Email or phone number is required";
      newErrors.phone = "Email or phone number is required";
    } else {
      // Simple email format check
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }
      // Simple phone number check
      if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate step 2 fields: password, confirmPassword
   */
  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handler for initial form submission
   * @param e - Form event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset API error on new submission
    setErrors((prevErrors) => ({ ...prevErrors, apiError: undefined }));

    // If step 1, validate and proceed to step 2
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
    // If step 2, validate and then show dialog
    else if (step === 2) {
      if (validateStep2()) {
        // Show the AlertDialog before actually submitting data
        setShowDialog(true);
      }
    }
  };

  /**
   * Handler for confirming account creation and login
   * This runs when the user presses "Create Account and Login" in the AlertDialog.
   */
  const handleConfirmCreateAndLogin = async (): Promise<void> => {
    setShowDialog(false);
    setIsSubmitting(true);
    
    // Prepare data to send to the API
    const payload = {
      name: formData.fullName,
      email: formData.email || undefined, // Send undefined if empty
      phoneNumber: formData.phone || undefined,
      password: formData.password
    };
    

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.NEXT_PUBLIC_API_SECRET && {
            'X-API-SECRET': process.env.NEXT_PUBLIC_API_SECRET,
          }),
        },
        body: JSON.stringify(payload),
      });
      
      let data, apiKey;
      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        apiKey = data.apiKey;
      } else {
        // If response is not JSON, throw an error
        setShowToast(true)
        setErrors({
          apiError: "Received non-JSON response from server.",
        });
      }

      if (!response.ok) {
        setShowToast(true)
        // Handle validation errors from the API
        if (response.status === 400 && data.errors) {
          const apiErrors: FormErrors = {};
          data.errors.forEach((error: any) => {
            const field = error.path[0] as keyof FormErrors;
            if (
              [
                "fullName",
                "email",
                "phone",
                "password",
                "confirmPassword",
                "avatar",
                "apikey"
              ].includes(field)
            ) {
              apiErrors[field] = error.message;
            }
          });
          setErrors(apiErrors);
        } else if (response.status === 409 && data.error) {
          // Handle conflict errors (e.g., email or phone already exists)
          setErrors({ apiError: data.error });
        } else {
          // Handle other errors
          setErrors({
            apiError: "An unexpected error occurred. Please try again.",
          });
        }
      } else {
        // Success - now log in the user via next-auth credentials provider
        const loginResponse = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
          apiKey: apiKey
        });

        if (loginResponse && !loginResponse.error) {
          
        } else {
          // If login fails for some reason
          setShowToastACBNL(true)
          setErrors({
            apiError:
              "Account created, but login failed. Please try logging in manually.",
          });
        }
      }
    } catch (error) {
      setShowToast(true)
      console.error("Error submitting form:", error);
      setErrors({
        apiError: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handler for input changes
   * @param e - Change event for input elements
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handler for file input changes (avatar upload)
   * @param e - Change event for file input
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type (optional)
      if (!file.type.startsWith("image/")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          avatar: "Only image files are allowed",
        }));
        return;
      }

      // Clear previous avatar errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: undefined,
      }));

      setAvatar(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handler for removing the avatar
   */
  const handleAvatarRemove = () => {
    setAvatar(null);
    setAvatarPreview("/[countryCode]/(auth)/auth/signup/defaultavatar.png");
    setErrors((prevErrors) => ({
      ...prevErrors,
      avatar: undefined,
    }));
  };


  return (
    <div className="flex min-h-screen">
      {/* Left side with background image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url('/[countryCode]/(auth)/auth/signup/signup.webp')` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80"></div>
        {/* Text content */}
        <div className="relative z-10 p-12 flex flex-col justify-end h-full">
          {/* Footer with logo and larger company name */}
          <div className="flex items-center justify-center">
            <Image src="/[countryCode]/(auth)/auth/common/logo.png" alt="Logo" width={80} height={80} />
            <h1 className="text-4xl font-angelos text-white ml-12">
              Last Land
            </h1>
          </div>
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Security indicator */}
          <div className="flex items-center justify-center text-gray-600">
            <FiLock className="mr-2 text-xl" />
            <span>Secure Connection</span>
          </div>
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <p className="text-center text-gray-500">
            {step === 1
              ? "Fill in your basic details"
              : "Create a secure password"}
          </p>

          {/* Display API error if any */}
          {errors.apiError && (
            <ToastDestructive
                    isOpen={showToast}
                    title="An error occured"
                    description={errors.apiError}
                    onTryAgain={() => {
                      console.log("Retry logic goes here...");
                      // E.g. re-fetch data or re-submit a form
                    }}
                    onClose={() => setShowToast(false)}
                  />
          )}

          {/* Display API error if any */}
          {errors.apiError && (
            <ToastACBNL
                    isOpen={showToastACBNL}
                    title="An error occured"
                    description={errors.apiError}
                    onTryAgain={() => {
                      console.log("Retry logic goes here...");
                      // E.g. re-fetch data or re-submit a form
                    }}
                    onClose={() => setShowToastACBNL(false)}
                  />
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4 transition-all duration-300">
                {/* Full Name Field */}
                <div className="relative">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={`mt-1 w-full px-4 py-3 border ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-invalid={errors.fullName ? "true" : "false"}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`mt-1 w-full px-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-red-500 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`mt-1 w-full px-4 py-3 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-red-500 text-sm">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 transition-all duration-300">
                {/* Password Field */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
                      }
                    />
                    {/* Password visibility toggle */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center justify-center focus:outline-none"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="text-gray-500" />
                      ) : (
                        <AiOutlineEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-1">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      aria-invalid={
                        errors.confirmPassword ? "true" : "false"
                      }
                      aria-describedby={
                        errors.confirmPassword
                          ? "confirmPassword-error"
                          : undefined
                      }
                    />
                    {/* Confirm Password visibility toggle */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center justify-center focus:outline-none"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className="text-gray-500" />
                      ) : (
                        <AiOutlineEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p
                      id="confirmPassword-error"
                      className="mt-1 text-red-500 text-sm"
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Terms and Conditions (Only show on final step) */}
            {step === 2 && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  name="terms"
                  required
                />
                <span className="ml-2 text-gray-600 text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>
                </span>
              </div>
            )}

            {/* Navigation Buttons */}
            {step === 1 ? (
              <Button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Next"}
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="flex flex-col space-y-4 mt-6">
            <Button
              variant="outline"
              className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              onClick={() =>
                signIn("google", {redirect: true, callbackUrl: "/dashboard/settings/account/update-profile" })
              }
            >
              <FcGoogle className="mr-2 text-xl" />
              Sign up with Google
            </Button>

            <Button
              variant="outline"
              className="w-full py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 flex items-center justify-center group"
              onClick={() =>
                signIn("apple")
              }
            >
              <FaApple className="mr-2 text-xl text-gray-600 group-hover:text-black transition-colors duration-200" />
              Sign up with Apple
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link href="/in/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
          <AlertDialogHeader className="mb-4">
            <AlertDialogTitle className="text-2xl font-semibold text-gray-900">
              Create Account and Login
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600 mt-1">
              Please review and edit your information below before creating your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmCreateAndLogin();
            }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <Avatar
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 cursor-pointer rounded-full ring-3 ring-gray-400 ring-offset-2 ring-offset-white"
                >
                  {avatarPreview ? (
                    <AvatarImage
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-gray-100 text-gray-500 flex items-center justify-center rounded-full overflow-hidden">
                      <img
                        src="/[countryCode]/(auth)/auth/signup/defaultavatar.png"  // Replace with your default avatar image path
                        alt="Default Avatar"
                        className="w-full h-full object-cover"
                      />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />

              {errors.avatar && (
                <p className="mt-1 text-red-500 text-sm">{errors.avatar}</p>
              )}
            </div>

            {/* Full Name Field */}
            <div>
              <label
                htmlFor="dialog-fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                id="dialog-fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className={`block w-full px-4 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-invalid={errors.fullName ? "true" : "false"}
                aria-describedby={errors.fullName ? "dialog-fullName-error" : undefined}
              />
              {errors.fullName && (
                <p id="dialog-fullName-error" className="mt-1 text-red-500 text-sm">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="dialog-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                id="dialog-email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "dialog-email-error" : undefined}
              />
              {errors.email && (
                <p id="dialog-email-error" className="mt-1 text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="dialog-phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                id="dialog-phone"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleInputChange}
                className={`block w-full px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "dialog-phone-error" : undefined}
              />
              {errors.phone && (
                <p id="dialog-phone-error" className="mt-1 text-red-500 text-sm">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="dialog-password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="dialog-password"
                  placeholder="Password"
                  value={formData.password}
                  readOnly
                  className={`block w-full px-4 py-2 border bg-gray-100 text-gray-400 cursor-not-allowed ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg pr-10 focus:outline-none`}
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "dialog-password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="dialog-password-error"
                  className="mt-1 text-red-500 text-sm"
                >
                  {errors.password}
                </p>
              )}
            </div>


            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium">Password strength: </span>
                  <span
                    className={`ml-2 ${
                      formData.password.length >= 12 &&
                      /[A-Z]/.test(formData.password) &&
                      /[a-z]/.test(formData.password) &&
                      /[0-9]/.test(formData.password) &&
                      /[\W_]/.test(formData.password)
                        ? "text-green-600"
                        : formData.password.length >= 8 &&
                          ((/[A-Z]/.test(formData.password) &&
                            /[a-z]/.test(formData.password)) ||
                            (/[a-z]/.test(formData.password) &&
                              /[0-9]/.test(formData.password)) ||
                            (/[A-Z]/.test(formData.password) &&
                              /[0-9]/.test(formData.password)))
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {formData.password.length >= 12 &&
                    /[A-Z]/.test(formData.password) &&
                    /[a-z]/.test(formData.password) &&
                    /[0-9]/.test(formData.password) &&
                    /[\W_]/.test(formData.password)
                      ? "Strong"
                      : formData.password.length >= 8 &&
                        ((/[A-Z]/.test(formData.password) &&
                          /[a-z]/.test(formData.password)) ||
                          (/[a-z]/.test(formData.password) &&
                            /[0-9]/.test(formData.password)) ||
                          (/[A-Z]/.test(formData.password) &&
                            /[0-9]/.test(formData.password)))
                      ? "Moderate"
                      : "Weak"}
                  </span>
                </div>
              </div>
            )}

          <AlertDialogFooter className="flex justify-end pt-4 border-t border-gray-200 mt-6">
            {/* Show remove avatar button only if there is an avatar preview and it's not the default one */}
            {avatarPreview && avatarPreview !== "/[countryCode]/(auth)/auth/signup/defaultavatar.png" && (
              <button
                type="button"
                onClick={handleAvatarRemove}
                className="py-2 px-4 bg-red-600 text-sm text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Avatar
              </button>
            )}

            <AlertDialogCancel className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account and Login
            </AlertDialogAction>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SignupPage;
