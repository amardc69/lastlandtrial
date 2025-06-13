"use client";

import React, { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { ProposalSuccessToast, PlatformIcon } from "./ProposalSuccessToast";
import { calculatePrice } from "../function";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { ProposalConfirmationProps } from "../interface";

const ProposalConfirmation: React.FC<ProposalConfirmationProps> = ({
  open,
  onOpenChange,
  selectedCards,
  integrationDetails,
  totalPrice,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [mode, setMode] = useState<'proposal' | 'draft'>('proposal');

  const serviceFee = totalPrice * 0.10;
  const finalTotal = totalPrice + serviceFee;

  const onConfirm = async () => {
    setIsSending(true);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    const isDraftMode = mode === 'draft';

    try {
      const payload = {
        selectedCards: Object.fromEntries(selectedCards),
        integrationDetails: Object.fromEntries(integrationDetails),
        totalPrice,
        serviceFee,
        finalTotal,
        isDraft: isDraftMode,
      };
      
      if (isDraftMode) {
        await axios.post('http://localhost:3002/api/proposal/draft', payload);
        toast.success("Proposal draft saved successfully!");
      } else {
        await axios.post('http://localhost:3002/api/proposal', payload);
        toast.custom(
          (t) => (
            <ProposalSuccessToast
              toastId={t}
              selectedCards={selectedCards}
              finalTotal={finalTotal}
            />
          ),
          {
            duration: 10000,
          }
        );
      }

    } catch (error) {
      console.error(isDraftMode ? "Failed to save draft:" : "Failed to send proposal:", error);
      toast.error(isDraftMode ? "Failed to save draft. Please try again later." : "Failed to send proposal. Please try again later.");
    } finally {
      setIsSending(false);
      setIsConfirmed(false);
      onOpenChange(false);
    }
  };

  const handleContinueClick = async () => {
    setIsProcessing(true);
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    setIsProcessing(false);
    onOpenChange(true);
  };

  const isDraft = mode === 'draft';

  return (
    <>
      <Button
        onClick={handleContinueClick}
        disabled={isProcessing || selectedCards.size === 0}
        className={`bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer disabled:bg-blue-700 disabled:cursor-not-allowed flex items-center justify-center ${
          isProcessing ? 'w-42' : 'w-36'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Making Proposal
          </>
        ) : (
          "Continue Process"
        )}
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-5xl bg-white h-[85vh] flex flex-col data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-500 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-500"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Review Your Proposal
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 mt-4 flex-grow min-h-0">
            <div className="lg:col-span-3 h-full overflow-y-auto space-y-4 pr-3">
              {Array.from(selectedCards.entries()).map(
                ([key, { platform, content }]) => {
                  const details = integrationDetails.get(key);
                  if (!details) return null;
                  
                  const price = calculatePrice(content.basePrice, details);

                  return (
                    <div key={key} className="border border-gray-300 rounded-lg p-4 space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <PlatformIcon platform={platform} />
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg text-gray-800 capitalize">
                              {platform}
                            </h4>
                            <Badge variant="outline" className="text-sm">{content.type}</Badge>
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{price.toLocaleString()}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600 pl-8">
                        <p><strong>Time of Integration:</strong> {details.timeOfIntegration} sec</p>
                        <p><strong>Start Date:</strong> {details.startDate ? format(new Date(details.startDate), 'PPP') : 'N/A'}</p>
                        <p><strong>End Date:</strong> {details.endDate ? format(new Date(details.endDate), 'PPP') : 'N/A'}</p>
                        <p><strong>Situation:</strong> {details.integrationSituation || "N/A"}</p>
                        <p><strong>Promo Content:</strong> {details.promotionContentProvided || "N/A"}</p>
                        {details.additionalInfo && (
                          <p className="col-span-1 md:col-span-2">
                            <strong>Additional Info:</strong> {details.additionalInfo}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            
            <div className="lg:col-span-2 flex flex-col h-full">
              <div className="border border-gray-300 rounded-lg flex flex-col h-full">
                <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Summary
                  </h3>
                  <ToggleSwitch
                    option1Value="proposal"
                    option1Label="Proposal"
                    option2Value="draft"
                    option2Label="Draft"
                    value={mode}
                    onChange={(newMode) => setMode(newMode as 'proposal' | 'draft')}
                    disabled={isSending}
                  />
                </div>
                
                <div className="flex-grow p-4 overflow-y-auto">
                  <div className="space-y-3">
                    {Array.from(selectedCards.entries()).map(([key, { platform, content }]) => {
                       const details = integrationDetails.get(key);
                        if (!details) return null;
                      const price = calculatePrice(content.basePrice, details);
                      return (
                        <div key={`summary-${key}`} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <PlatformIcon platform={platform} size="sm" />
                            <div className="flex items-center gap-1.5">
                              <p className="text-gray-700 capitalize">{platform}</p>
                              <Badge variant="secondary" className="font-light text-xs px-1.5 py-0.5 border-gray-300">{content.type}</Badge>
                            </div>
                          </div>
                          <p className="font-medium text-gray-800">₹{price.toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-300">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium text-gray-800">₹{totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-600">Service Fee (10%)</p>
                      <p className="font-medium text-gray-800">₹{serviceFee.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-medium text-gray-800 font-semibold">Total Price</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{finalTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-300 bg-gray-50 rounded-b-lg">
                  <div className="flex items-start space-x-3 mb-4">
                    <Checkbox
                      id="confirmation"
                      checked={isConfirmed}
                      onCheckedChange={(checked: CheckedState) => setIsConfirmed(!!checked)}
                      disabled={isSending}
                      className="data-[state=checked]:bg-gray-900 data-[state=checked]:text-white mt-0.5"
                    />
                    <label htmlFor="confirmation" className="text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I confirm that all the details entered are correct and final.
                    </label>
                  </div>
                  <div className="flex justify-end gap-3">
                    {!isDraft && (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            disabled={!isConfirmed || isSending}
                            variant="outline"
                            className="border-gray-300 cursor-pointer text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Verify Proposal
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 bg-white text-sm p-3 border-gray-200 shadow-xl rounded-lg">
                          Verified proposals have an outstanding 99% acceptance rate.
                        </HoverCardContent>
                      </HoverCard>
                    )}
                    <Button
                      onClick={onConfirm}
                      disabled={!isConfirmed || isSending}
                      className={`bg-gray-900 text-white cursor-pointer hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center transition-all duration-300 ease-in-out ${
                        isSending ? 'w-42' : 'w-32'
                      }`}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isDraft ? "Saving Draft" : "Sending Proposal"}
                        </>
                      ) : (
                        isDraft ? "Save Draft" : "Send Proposal"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProposalConfirmation;
