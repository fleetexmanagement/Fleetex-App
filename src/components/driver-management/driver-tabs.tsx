"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DriverInformationSection } from "./driver-information-section";
import { IdentificationLicensingSection } from "./identification-licensing-section";
import { HealthComplianceSection } from "./health-compliance-section";
import { ExperienceReferencesSection } from "./experience-references-section";
import type { DriverFormValues } from "../../types/form-types";
import { defaultDriverFormValues } from "../../types/form-types";

/**
 * Driver Tabs Component
 * 
 * Manages the multi-step driver form with 4 tabs:
 * - Step 01: Driver Information
 * - Step 02: Identification & Licensing
 * - Step 03: Health & Compliance
 * - Step 04: Experience & References
 * 
 * Features:
 * - Single form instance shared across all tabs
 * - Step-by-step navigation
 * - Form validation per section
 * - Submit button on final step
 */
export const DriverTabs = () => {
  const [activeTab, setActiveTab] = useState("step-01");
  
  // Single form instance for all sections
  const form = useForm<DriverFormValues>({ defaultValues: defaultDriverFormValues, mode: "onBlur"});

  // Handle form submission
  const onSubmit: SubmitHandler<DriverFormValues> = (values) => {
    console.log("Form submitted with values:", values);
    console.table(values);
  };

  // Validate current step before moving to next
  const handleNext = async (nextStep: string) => {
    const isValid = await form.trigger();
    if (isValid) {
      setActiveTab(nextStep);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="space-y-6 px-4 lg:gap-2 lg:px-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        {/* Tab Navigation */}
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="step-01" className="flex items-center gap-2">
            <span className="hidden sm:inline">Step</span> 01
          </TabsTrigger>
          <TabsTrigger value="step-02" className="flex items-center gap-2">
            <span className="hidden sm:inline">Step</span> 02
          </TabsTrigger>
          <TabsTrigger value="step-03" className="flex items-center gap-2">
            <span className="hidden sm:inline">Step</span> 03
          </TabsTrigger>
          <TabsTrigger value="step-04" className="flex items-center gap-2">
            <span className="hidden sm:inline">Step</span> 04
          </TabsTrigger>
        </TabsList>

        {/* Step 01: Driver Information */}
        <TabsContent value="step-01" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step 01: Driver Information</CardTitle>
              <CardDescription>
                Identity, assignment, and personal background collected per compliance requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DriverInformationSection form={form} />
              <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNext("step-02")}
                  className="w-full md:w-auto"
                >
                  Next: Identification & Licensing →
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 02: Identification & Licensing */}
        <TabsContent value="step-02" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step 02: Identification & Licensing</CardTitle>
              <CardDescription>
                CNIC, license, and DDC credentials with supporting documents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IdentificationLicensingSection form={form} />
              <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("step-01")}
                  className="w-full md:w-auto"
                >
                  ← Previous: Driver Information
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNext("step-03")}
                  className="w-full md:w-auto"
                >
                  Next: Health & Compliance →
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 03: Health & Compliance */}
        <TabsContent value="step-03" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step 03: Health & Compliance</CardTitle>
              <CardDescription>
                Vaccination, medical fitness, and substance screening checkpoints.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HealthComplianceSection form={form} />
              <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("step-02")}
                  className="w-full md:w-auto"
                >
                  ← Previous: Identification & Licensing
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNext("step-04")}
                  className="w-full md:w-auto"
                >
                  Next: Experience & References →
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 04: Experience & References */}
        <TabsContent value="step-04" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Step 04: Experience & References</CardTitle>
              <CardDescription>
                Operational history, preferred languages, and verification contacts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExperienceReferencesSection form={form} />
              <div className="mt-6 flex flex-col gap-2 md:flex-row md:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("step-03")}
                  className="w-full md:w-auto"
                >
                  ← Previous: Health & Compliance
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full md:w-auto md:min-w-[150px]"
                >
                  Create Driver
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

