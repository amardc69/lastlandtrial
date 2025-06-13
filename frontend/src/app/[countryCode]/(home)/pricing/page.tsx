// app/subscription-plans/page.tsx
"use client";

import React, { useEffect, useState } from "react";

interface SubscriptionPlan {
  id: number;
  moduleId: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  createdAt: string;
  updatedAt: string;
}

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      try {
        // Fetch subscription plans from the API route
        const response = await fetch(`/api/subscription-plans`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Something went wrong!");
        }

        const data: SubscriptionPlan[] = await response.json();
        setPlans(data); // Update state with fetched subscription plans
        console.log("Subscription Plans:", data);
      } catch (err: any) {
        console.error("Error fetching subscription plans:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Choose Your Subscription Plan
        </h1>

        {isLoading && (
          <p className="text-center text-gray-600">Loading subscription plans...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {!isLoading && !error && (
          <>
            {plans.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {plan.name}
                      </h2>
                      <div className="mb-6">
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">Monthly: Rs </span> {Number(plan.monthlyPrice)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">Yearly: Rs </span> {Number(plan.yearlyPrice)}
                        </p>
                      </div>
                      {/* Optional: Add more details or features here */}
                      <ul className="mb-6 text-gray-700">
                        <li className="mb-2">✓ Feature One</li>
                        <li className="mb-2">✓ Feature Two</li>
                        <li className="mb-2">✓ Feature Three</li>
                      </ul>
                    </div>
                    <button
                      className="mt-auto bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
                      onClick={() => handleBuyNow(plan)}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No subscription plans found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Example handler for the "Buy Now" button
const handleBuyNow = (plan: any) => {
  // Implement your purchase logic here, e.g., redirect to checkout
  console.log("Buy Now clicked for plan:", plan);
  alert(`You have selected the ${plan.name} plan.`);
};
