import React, { useState, useMemo } from "react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Info, PlusCircle, CreditCard, FilePenLine, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInCalendarDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { ServiceCardProps } from "../interface";
import { TIME_OF_INTEGRATION_LIMIT } from "../const";
import { calculatePrice } from "../function";


export const ServiceCard: React.FC<ServiceCardProps> = ({
  cardKey,
  platform,
  content,
  platformLogo,
  integrationDetails,
  onIntegrationDetailChange,
}) => {
  const calculatedPrice = calculatePrice(content.basePrice, integrationDetails);

  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const hasAdditionalInfo =
    integrationDetails.additionalInfo &&
    integrationDetails.additionalInfo.length > 0;

  const handleDateSelect = (newRange: DateRange | undefined) => {
    if (newRange?.from) {
        onIntegrationDetailChange(cardKey, "startDate", format(newRange.from, "yyyy-MM-dd"));
        const endDate = newRange.to || newRange.from;
        onIntegrationDetailChange(cardKey, "endDate", format(endDate, "yyyy-MM-dd"));
    }
  };

  const deliveryDateRange = useMemo(() => {
    const from = integrationDetails.startDate ? new Date(integrationDetails.startDate) : undefined;
    const to = integrationDetails.endDate ? new Date(integrationDetails.endDate) : undefined;
    return { from, to };
  }, [integrationDetails.startDate, integrationDetails.endDate]);

  const duration = useMemo(() => {
    if (deliveryDateRange.from && deliveryDateRange.to) {
        const start = deliveryDateRange.from;
        const end = deliveryDateRange.to;
         if (end >= start) {
            return differenceInCalendarDays(end, start) + 1;
        }
    }
    return 0;
  }, [deliveryDateRange]);


  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {platformLogo && (
              <div className="flex-shrink-0">{platformLogo}</div>
            )}
            <span className="font-medium text-base">{platform}</span>
            <Badge variant="outline" className="text-sm">
              {content.type}
            </Badge>
          </div>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Info size={16} className="text-gray-400 hover:text-gray-700" />
            </HoverCardTrigger>
            <HoverCardContent className="w-52 p-4 bg-white rounded-md shadow-md">
              <h4 className="font-semibold mb-2">Additional Details</h4>
              <p className="text-sm text-gray-600">{content.description}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardHeader>
      <CardContent className="pt-4 px-4 pb-4">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time of Integration (seconds)
            </label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[
                  Number(integrationDetails.timeOfIntegration) ||
                    TIME_OF_INTEGRATION_LIMIT.default,
                ]}
                onValueChange={(val) =>
                  onIntegrationDetailChange(
                    cardKey,
                    "timeOfIntegration",
                    String(val[0])
                  )
                }
                min={TIME_OF_INTEGRATION_LIMIT.min}
                max={TIME_OF_INTEGRATION_LIMIT.max}
                step={1}
                className="w-full"
              />
              <Input
                min={TIME_OF_INTEGRATION_LIMIT.min}
                max={TIME_OF_INTEGRATION_LIMIT.max}
                value={integrationDetails.timeOfIntegration}
                onChange={(e) =>
                  onIntegrationDetailChange(
                    cardKey,
                    "timeOfIntegration",
                    e.target.value
                  )
                }
                className="w-16 border-gray-200 text-center"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Integration Situation
              </label>
              <Select
                value={integrationDetails.integrationSituation}
                onValueChange={(value: string) =>
                  onIntegrationDetailChange(
                    cardKey,
                    "integrationSituation",
                    value
                  )
                }
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="within-content">Within Content</SelectItem>
                  <SelectItem value="separate-post">Separate Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 pb-2">
                Promotion Content Provided
              </label>
              <Select
                value={integrationDetails.promotionContentProvided}
                onValueChange={(value: string) =>
                  onIntegrationDetailChange(
                    cardKey,
                    "promotionContentProvided",
                    value
                  )
                }
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="provided">Provided</SelectItem>
                  <SelectItem value="not-provided">Not Provided</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Start Date - End Date
              </label>
              <div className="pt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-between text-left font-normal border-gray-300 cursor-pointer",
                        !deliveryDateRange.from && "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {deliveryDateRange.from ? (
                          deliveryDateRange.to ? (
                            <>
                              {format(deliveryDateRange.from, "LLL dd, y")} -{" "}
                              {format(deliveryDateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(deliveryDateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </div>
                      <Badge variant="secondary">
                        {duration}{" "}
                        {duration === 1
                          ? "Day"
                          : "Days"}
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 mb-1 mt-1"
                    align="center"
                  >
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={deliveryDateRange?.from}
                      selected={deliveryDateRange}
                      onSelect={handleDateSelect}
                      disabled={(day) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return day < today;
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-24">
              <label
                htmlFor={`quantity-${cardKey}`}
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <Input
                id={`quantity-${cardKey}`}
                type="number"
                min="1"
                value={integrationDetails.quantity || 1}
                onChange={(e) => {
                  const value = Math.max(1, Number(e.target.value));
                  onIntegrationDetailChange(cardKey, "quantity", value);
                }}
                className="w-full border-gray-300 mt-2 h-10"
                placeholder="1"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-6">
          <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center gap-2 text-sm cursor-pointer text-gray-500 hover:text-gray-800">
                {hasAdditionalInfo ? (
                  <FilePenLine className="h-5 w-5" />
                ) : (
                  <PlusCircle className="h-5 w-5" />
                )}
                <span>
                  {hasAdditionalInfo
                    ? "Edit additional information"
                    : "Add additional information"}
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Additional Information</DialogTitle>
              </DialogHeader>
              <Textarea
                className="w-full h-[30vh] rounded-xl"
                value={integrationDetails.additionalInfo || ""}
                onChange={(e) =>
                  onIntegrationDetailChange(
                    cardKey,
                    "additionalInfo",
                    e.target.value
                  )
                }
                placeholder="Enter any additional information here..."
              />
              <DialogFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setInfoDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-xl"
                  onClick={() => setInfoDialogOpen(false)}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-600" />
            <p className="text-sm font-semibold text-gray-800">
              ₹{calculatedPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
