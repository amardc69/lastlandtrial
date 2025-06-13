"use client";

import React, { useState, useMemo } from "react";
import { format, addDays } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { platforms, TIME_OF_INTEGRATION_LIMIT } from "../const";
import { calculatePrice } from "../function";
import ProposalConfirmation from "./ProposalConfirmation";
import { ServicesShowcaseProps, IntegrationDetails } from "../interface";


export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ user }) => {
  const availablePlatforms = platforms.filter(
    (platform) =>
      user.platforms &&
      user.platforms
        .map((p) => p.toLowerCase())
        .includes(platform.name.toLowerCase())
  );

  const [selectedCards, setSelectedCards] = useState<
    Map<string, { platform: string; content: any }>
  >(new Map());
  const [integrationDetails, setIntegrationDetails] = useState<
    Map<string, IntegrationDetails>
  >(new Map());

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleToggleGroupChange = (selectedValues: string[]) => {
    const newSelected = new Map<string, { platform: string; content: any }>();
    const newIntegrationDetails = new Map(integrationDetails);

    selectedValues.forEach((value) => {
      const [platformName, contentType] = value.split("|");
      const platformObj = availablePlatforms.find(
        (p) => p.name === platformName
      );
      const content = platformObj?.content.find(
        (c) => c.type === contentType
      );
      if (platformObj && content) {
        newSelected.set(value, { platform: platformObj.name, content });
        if (!newIntegrationDetails.has(value)) {
            newIntegrationDetails.set(value, {
            timeOfIntegration: String(TIME_OF_INTEGRATION_LIMIT.default),
            integrationSituation: "within-content",
            promotionContentProvided: "not-provided",
            startDate: format(new Date(), "yyyy-MM-dd"),
            endDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
            additionalInfo: "",
            quantity: 1
          });
        }
      }
    });

    // Remove details for deselected cards
    integrationDetails.forEach((_, key) => {
        if (!selectedValues.includes(key)) {
            newIntegrationDetails.delete(key);
        }
    });

    setSelectedCards(newSelected);
    setIntegrationDetails(newIntegrationDetails);
  };

  const handleIntegrationDetailChange = (
    cardKey: string,
    field: keyof IntegrationDetails,
    value: string | number
  ) => {
    setIntegrationDetails((prev) => {
      const newDetails = new Map(prev);
      const details: IntegrationDetails = newDetails.get(cardKey) || {
        timeOfIntegration: String(TIME_OF_INTEGRATION_LIMIT.default),
        integrationSituation: "within-content",
        promotionContentProvided: "not-provided",
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(addDays(new Date(), 7), "yyyy-MM-dd"),
        additionalInfo: "",
        quantity: 1,
      };
      (details as any)[field] = value;
      newDetails.set(cardKey, details);
      return newDetails;
    });
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    selectedCards.forEach(({ content }, key) => {
      const details = integrationDetails.get(key);
      if (details) {
        total += calculatePrice(content.basePrice, details);
      }
    });
    return total;
  }, [selectedCards, integrationDetails]);

  const selectedValues = Array.from(selectedCards.keys());

  const handleSendProposal = () => {
    console.log("Proposal sent", {
      selectedCards: Array.from(selectedCards.entries()),
      integrationDetails: Array.from(integrationDetails.entries()),
      totalPrice,
    });
    setDialogOpen(false);
  };

  return (
    <div className="md:w-2/5 w-full min-h-full border border-gray-300 rounded-2xl">
      <div className="w-full p-6 space-y-6 h-full max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between space-x-2">
          <h1 className="text-xl font-bold text-left">Select the Services</h1>
          <div className="ml-auto">
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Info
                  size={22}
                  className="text-gray-400 hover:text-gray-700 transform"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-64 p-4 bg-white rounded-md shadow-md">
                <h4 className="font-semibold mb-2">Terms and Conditions</h4>
                <p className="text-sm text-gray-600">
                  By selecting services, you agree to our terms and conditions.
                  Please review them carefully before proceeding.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <ToggleGroup
          type="multiple"
          value={selectedValues}
          onValueChange={handleToggleGroupChange}
          className="flex flex-wrap gap-3 justify-start"
        >
          {availablePlatforms.flatMap((platform) =>
            platform.content.map((card) => {
              const key = `${platform.name}|${card.type}`;
              const isSelected = selectedCards.has(key);
              const isDisabled = card.disabled || false;
              return (
                <ToggleGroupItem
                  key={key}
                  value={key}
                  disabled={isDisabled}
                  className={`flex items-center justify-start h-10 border-2 rounded-2xl cursor-pointer transition-colors
                    ${isSelected ? "border-black bg-gray-100" : "border-gray-300 hover:border-gray-400"}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    px-4 py-2 whitespace-nowrap text-black hover:text-black`}
                >
                  <div className="flex-shrink-0">{platform.logo}</div>
                  <div className="text-sm font-medium">{card.type}</div>
                </ToggleGroupItem>
              );
            })
          )}
        </ToggleGroup>

        {selectedCards.size > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-300 space-y-6">
            <h3 className="text-xl font-semibold">Edit your Preferences</h3>
            <ul className="space-y-4">
              {Array.from(selectedCards.entries()).map(
                ([key, { platform, content }]) => {
                  const [platformName] = key.split("|");
                  const platformObj = availablePlatforms.find(
                    (p) => p.name === platformName
                  );

                  const platformLogo = platformObj?.logo || null;
                  const details = integrationDetails.get(key);
                  
                  if (!details) return null;

                  return (
                    <ServiceCard
                      key={key}
                      cardKey={key}
                      platform={platform}
                      content={content}
                      platformLogo={platformLogo}
                      integrationDetails={details}
                      onIntegrationDetailChange={handleIntegrationDetailChange}
                    />
                  );
                }
              )}
            </ul>
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">
                Total Price : ₹{totalPrice.toLocaleString()}
              </h4>
              <ProposalConfirmation
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                selectedCards={selectedCards}
                integrationDetails={integrationDetails}
                totalPrice={totalPrice}
                handleSendProposal={handleSendProposal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesShowcase;
