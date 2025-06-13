// src/components/layout/header/TrierDialog.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const trierBenefits = [
    {
        id: 1,
        title: 'Exclusive Early Access',
        description: 'Be the first to experience new features and updates before anyone else.',
    },
    {
        id: 2,
        title: 'Shape the Future',
        description: 'Your valuable feedback will directly influence our product development.',
    },
    {
        id: 3,
        title: 'Direct Support Line',
        description: 'Get priority support from our dedicated team for triers.',
    },
    {
        id: 4,
        title: 'Community & Recognition',
        description: 'Join an exclusive community and get recognized for your contributions.',
    },
];

export function TrierDialog() {
    const [isTrierDialogOpen, setIsTrierDialogOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === trierBenefits.length - 1 ? 0 : prev + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? trierBenefits.length - 1 : prev - 1));
    };

    const handleBecomeTrierContinue = () => {
        if (termsAccepted) {
            console.log('User agreed to terms and wants to become a Trier.');
            setIsTrierDialogOpen(false);
            // Example: router.push('/become-a-trier-application');
        } else {
            console.warn('Please accept the terms and conditions to continue.');
        }
    };

    return (
        <Dialog open={isTrierDialogOpen} onOpenChange={setIsTrierDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="py-3 text-sm rounded-2xl bg-black cursor-pointer"
                    onClick={() => {
                        setCurrentSlide(0);
                        setTermsAccepted(false);
                        setIsTrierDialogOpen(true);
                    }}
                >
                    Become a Trier
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Become a Trier</DialogTitle>
                    <DialogDescription>
                        Explore the benefits of joining our Trier program and help us grow.
                    </DialogDescription>
                </DialogHeader>

                <div className="my-3 p-6 rounded-lg border bg-slate-50 min-h-[150px] flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {trierBenefits[currentSlide].title}
                    </h3>
                    <p className="text-sm text-slate-600">
                        {trierBenefits[currentSlide].description}
                    </p>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <Button variant="outline" size="icon" onClick={handlePrevSlide} aria-label="Previous benefit">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex space-x-2">
                        {trierBenefits.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'}`}
                                aria-label={`Go to benefit ${index + 1}`}
                            />
                        ))}
                    </div>
                    <Button variant="outline" size="icon" onClick={handleNextSlide} aria-label="Next benefit">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        aria-label="Accept terms and conditions"
                    />
                    <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the{' '}
                        <Link href="/in/dashboard/modules/promotional-ground/terms-and-conditions" className="underline hover:text-gray-800" target="_blank">
                            Terms and Conditions
                        </Link>.
                    </Label>
                </div>

                <DialogFooter className="sm:justify-end mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className='rounded-2xl cursor-pointer'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleBecomeTrierContinue} disabled={!termsAccepted} className='rounded-2xl cursor-pointer'>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}