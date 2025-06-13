// app/manage-subscription/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

type ModuleMap = {
  [key: number]: string;
};

const MODULES: ModuleMap = {
  1: 'Business Operations',
  2: 'Accountants',
  3: 'Consultations',
};

type Plan = {
  id: number;
  moduleId: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  createdAt: string;
  updatedAt: string;
};

type Subscription = {
  id: number;
  userId: number;
  planId: number;
  chosenBillingPeriod: 'MONTHLY' | 'YEARLY';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
  invoices: any[]; // Adjust based on invoice structure
};

type User = {
  id: number;
  email: string;
  name: string;
  apiKey: string;
};

type ResponseData = {
  user: User;
  subscriptions: Subscription[];
};

const ManageSubsPage: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (sessionStatus === 'loading') return;

      if (sessionStatus === 'unauthenticated') {
        setError('No active session found.');
        return;
      }

      const email = session?.user?.email;
      const apiKey = (session as any)?.user?.apiKey; // Adjust based on your session structure

      if (!email || !apiKey) {
        setError('Email or API key is missing in the session.');
        return;
      }

      const queryParams = new URLSearchParams({ email, apiKey });

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/database/subscription?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Something went wrong!');
        }

        const data: ResponseData = await response.json();
        setResponseData(data);
        console.log('Subscription Response:', data);
      } catch (err: any) {
        console.error('Error fetching subscription:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [session, sessionStatus]);

  const renderSubscription = (subscription: Subscription) => {
    const {
      id,
      plan,
      chosenBillingPeriod,
      startDate,
      endDate,
      createdAt,
      updatedAt,
    } = subscription;

    const billingPeriod = chosenBillingPeriod === 'MONTHLY' ? 'Monthly' : 'Yearly';
    const price =
      chosenBillingPeriod === 'MONTHLY'
        ? `$${(parseInt(plan.monthlyPrice) / 100).toFixed(2)}`
        : `$${(parseInt(plan.yearlyPrice) / 100).toFixed(2)}`;

    return (
      <Card key={id} className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl">{plan.name} Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Module:</span> {MODULES[plan.moduleId] || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Billing Period:</span> {billingPeriod}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {price} / {billingPeriod.toLowerCase()}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Start Date:</span>{' '}
                {format(new Date(startDate), 'PPP p')}
              </p>
              <p>
                <span className="font-semibold">End Date:</span>{' '}
                {endDate && new Date(endDate).getTime() !== 0
                  ? format(new Date(endDate), 'PPP p')
                  : 'Ongoing'}
              </p>
              <p>
                <span className="font-semibold">Created At:</span>{' '}
                {format(new Date(createdAt), 'PPP p')}
              </p>
              <p>
                <span className="font-semibold">Updated At:</span>{' '}
                {format(new Date(updatedAt), 'PPP p')}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="secondary" size="sm">
            Manage Subscription
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Session Loading State */}
        {sessionStatus === 'loading' && (
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="w-12 h-12 rounded-full mb-4" />
            <Skeleton className="w-48 h-6" />
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* User Information */}
        {responseData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <span className="font-semibold">Name:</span> {responseData.user.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {responseData.user.email}
                </p>
                <p>
                  <span className="font-semibold">User ID:</span> {responseData.user.id}
                </p>
                <p>
                  <span className="font-semibold">Api-Key:</span> {responseData.user.apiKey}
                </p>
                {/* Add more user details if available */}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <Card key={idx} className="mb-6">
                <CardHeader className="flex justify-between items-center">
                  <Skeleton className="w-40 h-6" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="w-24 h-4 mb-2" />
                      <Skeleton className="w-32 h-4 mb-2" />
                      <Skeleton className="w-28 h-4" />
                    </div>
                    <div>
                      <Skeleton className="w-32 h-4 mb-2" />
                      <Skeleton className="w-28 h-4 mb-2" />
                      <Skeleton className="w-36 h-4 mb-2" />
                      <Skeleton className="w-40 h-4" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Skeleton className="w-32 h-8" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Main Content */}
        {responseData && !isLoading && (
          <>
            {/* All Subscriptions */}
            {responseData.subscriptions.length > 0 ? (
              responseData.subscriptions.map((subscription) => renderSubscription(subscription))
            ) : (
              <Alert variant="default">
                <AlertTitle>No Subscriptions</AlertTitle>
                <AlertDescription>You currently have no subscriptions.</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>

      {/* Optional: Loader Styles if needed elsewhere */}
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ManageSubsPage;
