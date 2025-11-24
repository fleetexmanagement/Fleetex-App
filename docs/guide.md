# Zustand State Management Guide

## Overview

This guide explains how to integrate Zustand state management into the driver form system. Zustand will allow you to persist form data across page refreshes and manage global form state.

## Why Zustand?

- **Lightweight**: Minimal boilerplate compared to Redux
- **Simple API**: Easy to use and understand
- **Persistent State**: Can persist to localStorage automatically
- **TypeScript Support**: Full type safety
- **No Provider Required**: Can be used without wrapping the app

## Installation

```bash
npm install zustand
# or
bun add zustand
# or
pnpm add zustand
```

## Step 1: Create Zustand Store

Create a new file: `src/store/driver-form-store.ts`

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DriverFormValues } from '@/components/driver-management/form-types';
import { defaultDriverFormValues } from '@/components/driver-management/form-types';

interface DriverFormState {
  // Form data
  formData: DriverFormValues;
  
  // Current step
  currentStep: string;
  
  // Form status
  isSubmitting: boolean;
  submitError: string | null;
  
  // Actions
  updateFormData: (data: Partial<DriverFormValues>) => void;
  setCurrentStep: (step: string) => void;
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error: string | null) => void;
}

export const useDriverFormStore = create<DriverFormState>()(
  persist(
    (set) => ({
      // Initial state
      formData: defaultDriverFormValues,
      currentStep: 'step-01',
      isSubmitting: false,
      submitError: null,

      // Update form data (merges with existing data)
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      // Set current step
      setCurrentStep: (step) =>
        set(() => ({
          currentStep: step,
        })),

      // Reset form to initial state
      resetForm: () =>
        set(() => ({
          formData: defaultDriverFormValues,
          currentStep: 'step-01',
          isSubmitting: false,
          submitError: null,
        })),

      // Set submitting state
      setSubmitting: (isSubmitting) =>
        set(() => ({
          isSubmitting,
        })),

      // Set submit error
      setSubmitError: (error) =>
        set(() => ({
          submitError: error,
        })),
    }),
    {
      name: 'driver-form-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Optional: Only persist form data, not loading states
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);
```

## Step 2: Update Driver Tabs Component

Modify `src/components/driver-management/driver-tabs.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDriverFormStore } from "@/store/driver-form-store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// ... other imports

export const DriverTabs = () => {
  // Get Zustand store state and actions
  const {
    formData: zustandFormData,
    currentStep: zustandCurrentStep,
    isSubmitting,
    submitError,
    updateFormData,
    setCurrentStep,
    resetForm,
    setSubmitting,
    setSubmitError,
  } = useDriverFormStore();

  // Initialize form with Zustand data
  const form = useForm<DriverFormValues>({
    defaultValues: zustandFormData,
    mode: "onBlur",
  });

  // Sync form values to Zustand store on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as DriverFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  // Use Zustand's current step
  const [activeTab, setActiveTab] = useState(zustandCurrentStep);

  // Sync tab changes to Zustand
  useEffect(() => {
    setCurrentStep(activeTab);
  }, [activeTab, setCurrentStep]);

  // Handle form submission with Zustand
  const onSubmit: SubmitHandler<DriverFormValues> = async (values) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      // TODO: Replace with API integration
      console.table(values);
      
      // On success, reset form
      resetForm();
      form.reset(defaultDriverFormValues);
      
      // Show success notification
      // toast.success('Driver created successfully!');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create driver';
      setSubmitError(errorMessage);
      console.error('Error creating driver:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Rest of component remains the same...
  return (
    <div className="space-y-6">
      {/* Show error if any */}
      {submitError && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab navigation and content */}
        {/* ... existing code ... */}
        
        {/* Update submit button to show loading state */}
        <Button
          type="button"
          onClick={handleSubmit}
          className="min-w-[150px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Driver'}
        </Button>
      </Tabs>
    </div>
  );
};
```

## Step 3: Optional - Handle File Persistence

Since `File` objects cannot be serialized to JSON, you have two options:

### Option A: Don't Persist Files (Recommended)

Files are typically uploaded immediately or just before submission. Update the store:

```typescript
// In driver-form-store.ts
partialize: (state) => ({
  formData: {
    ...state.formData,
    // Exclude File objects from persistence
    driverImage: null,
    cnicFrontImage: null,
    cnicBackImage: null,
    licenseFrontImage: null,
    licenseBackImage: null,
    ddcDocument: null,
    boosterCertificate: null,
    medicalDocument: null,
    policeVerificationImage: null,
  },
  currentStep: state.currentStep,
}),
```

### Option B: Convert Files to Base64 (Not Recommended)

This can significantly increase localStorage size and cause performance issues.

```typescript
// Helper function to convert File to base64
const fileToBase64 = (file: File | null): Promise<string | null> => {
  if (!file) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Helper to convert base64 back to File
const base64ToFile = (base64: string | null, filename: string): File | null => {
  if (!base64) return null;
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
```

## Step 4: Access Store in Other Components

You can access the driver form store from any component:

```typescript
import { useDriverFormStore } from "@/store/driver-form-store";

export const SomeComponent = () => {
  // Get specific values
  const driverName = useDriverFormStore((state) => state.formData.driverName);
  
  // Get all form data
  const formData = useDriverFormStore((state) => state.formData);
  
  // Get actions
  const updateFormData = useDriverFormStore((state) => state.updateFormData);
  const resetForm = useDriverFormStore((state) => state.resetForm);

  return (
    <div>
      <p>Driver Name: {driverName}</p>
      <button onClick={() => resetForm()}>Reset Form</button>
    </div>
  );
};
```

## Step 5: Clear Store on Successful Submission

After successfully creating a driver, clear the store:

```typescript
const onSubmit: SubmitHandler<DriverFormValues> = async (values) => {
  try {
    setSubmitting(true);
    
    // Submit to API
    await submitDriverForm(values);
    
    // On success: Reset everything
    resetForm();
    form.reset(defaultDriverFormValues);
    setActiveTab('step-01');
    
    // Show success and redirect
    toast.success('Driver created successfully!');
    router.push('/dashboard/driver-management');
    
  } catch (error) {
    // Handle error
  } finally {
    setSubmitting(false);
  }
};
```

## Advanced: Selective Field Updates

Update only specific fields without merging entire object:

```typescript
// In store
updateSingleField: <K extends keyof DriverFormValues>(
  field: K,
  value: DriverFormValues[K]
) =>
  set((state) => ({
    formData: { ...state.formData, [field]: value },
  })),

// Usage
updateSingleField('driverName', 'John Doe');
updateSingleField('cellNo', '0300-1234567');
```

## Advanced: Reset Specific Sections

Reset only a specific section of the form:

```typescript
// In store
resetSection: (sectionFields: (keyof DriverFormValues)[]) =>
  set((state) => {
    const resetData = { ...state.formData };
    sectionFields.forEach((field) => {
      resetData[field] = defaultDriverFormValues[field];
    });
    return { formData: resetData };
  }),

// Usage - Reset only identification section
resetSection([
  'cnicNo',
  'cnicIssueDate',
  'cnicExpiryDate',
  'cnicFrontImage',
  'cnicBackImage',
]);
```

## Testing the Store

```typescript
import { useDriverFormStore } from "@/store/driver-form-store";

// In a test or component
const store = useDriverFormStore.getState();

// Check initial state
console.log(store.formData);

// Update form
store.updateFormData({ driverName: 'Test Driver' });

// Check localStorage
console.log(localStorage.getItem('driver-form-storage'));

// Reset
store.resetForm();
```

## Troubleshooting

### Store Not Persisting

- Check browser console for localStorage errors
- Verify localStorage is enabled
- Check storage quota (localStorage limit is ~5-10MB)

### Type Errors

- Ensure `DriverFormValues` type is correctly imported
- Check that all store actions match the interface

### Performance Issues

- Only persist necessary data (exclude files)
- Use `partialize` to control what gets persisted
- Consider sessionStorage instead of localStorage for temporary data

### Form Not Syncing

- Ensure `form.watch()` subscription is properly set up
- Check that `updateFormData` is being called
- Verify form instance is using Zustand data as defaultValues

## Migration Checklist

- [ ] Install zustand package
- [ ] Create driver-form-store.ts
- [ ] Update driver-tabs.tsx to use store
- [ ] Test form data persistence (fill form, refresh page)
- [ ] Test form reset functionality
- [ ] Handle file persistence (exclude from storage)
- [ ] Update submit handler to reset store on success
- [ ] Add error handling in store
- [ ] Test in different browsers
- [ ] Add loading states using store

## Benefits After Integration

✅ **Data Persistence**: Form data survives page refreshes  
✅ **Global Access**: Access form data from any component  
✅ **Better UX**: Users don't lose progress  
✅ **State Management**: Centralized state for form and UI  
✅ **Type Safety**: Full TypeScript support  
✅ **Easy Testing**: Simple store testing without form instance  

