# Driver Form Data Flow Documentation

## Overview

This document describes the data flow architecture for the multi-step driver form system. The form is split into 4 separate sections, each rendered in its own tab component.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Add Driver Page                          │
│                    (page.tsx)                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Driver Tabs Component                      │
│                  (driver-tabs.tsx)                           │
│  - Manages single form instance (react-hook-form)           │
│  - Controls tab navigation                                  │
│  - Handles form submission                                  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Step 01    │  │   Step 02    │  │   Step 03    │
│   Driver     │  │ Ident. &     │  │ Health &     │
│ Information  │  │ Licensing    │  │ Compliance   │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                  │
       │                 │                  │
       └─────────────────┼──────────────────┘
                         │
                         ▼
                ┌──────────────┐
                │   Step 04    │
                │ Experience & │
                │  References  │
                └──────────────┘
```

## Data Flow

### 1. Form Initialization

**Location**: `driver-tabs.tsx`

```typescript
const form = useForm<DriverFormValues>({
  defaultValues: defaultDriverFormValues,
  mode: "onBlur",
});
```

- Single form instance created using `react-hook-form`
- Shared across all 4 tab sections
- Default values loaded from `form-types.ts`

### 2. Section Components

Each section component receives the form instance as a prop:

```typescript
// Step 01: Driver Information
<DriverInformationSection form={form} />

// Step 02: Identification & Licensing
<IdentificationLicensingSection form={form} />

// Step 03: Health & Compliance
<HealthComplianceSection form={form} />

// Step 04: Experience & References
<ExperienceReferencesSection form={form} />
```

Each section uses `FormGenerator` to render its fields, but **does not handle submission**. The form state is automatically synchronized across all sections.

### 3. Form State Management

**Current Implementation**: React Hook Form (in-memory)

- All form values stored in the form instance
- Values persist when switching between tabs
- Validation occurs per section when clicking "Next"
- Final validation on submit

### 4. Data Submission Flow

#### Current Flow (No API Integration)

```
User fills form across 4 steps
    ↓
User clicks "Create Driver" on Step 04
    ↓
Form validation triggered (form.trigger())
    ↓
If valid: onSubmit handler called
    ↓
Values logged to console (TODO: Replace with API call)
```

#### Future Flow (With API Integration)

```
User fills form across 4 steps
    ↓
User clicks "Create Driver" on Step 04
    ↓
Form validation triggered
    ↓
If valid: 
    - Transform form data to API format
    - Handle file uploads separately
    - Send POST request to API
    - Handle response (success/error)
    - Redirect or show notification
```

## API Integration Guide

### Step 1: Prepare Form Data

The form contains `File` objects for images and documents. You'll need to:

1. **Separate file fields from regular data**
2. **Convert File objects to FormData or upload separately**
3. **Map form values to API schema**

### Step 2: File Upload Strategy

**Option A: Upload files separately, then send references**

```typescript
async function submitDriverForm(values: DriverFormValues) {
  // 1. Upload all files first
  const fileFields = [
    'driverImage',
    'cnicFrontImage',
    'cnicBackImage',
    'licenseFrontImage',
    'licenseBackImage',
    'ddcDocument',
    'boosterCertificate',
    'medicalDocument',
    'policeVerificationImage',
  ];

  const fileUploads = fileFields
    .filter(field => values[field] instanceof File)
    .map(async (field) => {
      const file = values[field] as File;
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      return {
        field,
        url: await response.json(),
      };
    });

  const uploadedFiles = await Promise.all(fileUploads);

  // 2. Map form values to API payload
  const apiPayload = {
    // Basic driver info
    driverName: values.driverName,
    fatherName: values.fatherName,
    dateOfBirth: values.dateOfBirth,
    // ... other fields
    
    // Replace File objects with uploaded URLs
    driverImage: uploadedFiles.find(u => u.field === 'driverImage')?.url,
    cnicFrontImage: uploadedFiles.find(u => u.field === 'cnicFrontImage')?.url,
    // ... etc
  };

  // 3. Send driver data to API
  const response = await fetch('/api/drivers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiPayload),
  });

  return response.json();
}
```

**Option B: Send everything as FormData**

```typescript
async function submitDriverForm(values: DriverFormValues) {
  const formData = new FormData();

  // Append all fields (files will be included)
  Object.entries(values).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  const response = await fetch('/api/drivers', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}
```

### Step 3: Update onSubmit Handler

**Location**: `driver-tabs.tsx`

Replace the current `onSubmit` function:

```typescript
const onSubmit: SubmitHandler<DriverFormValues> = async (values) => {
  try {
    // Show loading state
    setIsSubmitting(true);

    // Transform and submit data
    const result = await submitDriverForm(values);

    // Handle success
    toast.success('Driver created successfully!');
    
    // Redirect or reset form
    router.push('/dashboard/driver-management');
    
  } catch (error) {
    // Handle error
    console.error('Error creating driver:', error);
    toast.error('Failed to create driver. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 4: Add Loading and Error States

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

## Data Structure

### Form Values Type

**Location**: `form-types.ts`

```typescript
type DriverFormValues = {
  // Driver Information
  driverImage: File | null;
  inductionDate: string;
  driverFileId: string;
  // ... 74 total fields
  
  // Identification & Licensing
  cnicNo: string;
  cnicFrontImage: File | null;
  licenseNumber: string;
  // ... etc
  
  // Health & Compliance
  vaccineStatus: string;
  medicalDocument: File | null;
  // ... etc
  
  // Experience & References
  previousJob: string;
  referenceName: string;
  // ... etc
}
```

### API Payload Example

Your API might expect a different structure. Transform accordingly:

```typescript
// Example API payload structure
interface DriverAPIPayload {
  personal_info: {
    name: string;
    father_name: string;
    date_of_birth: string;
    // ...
  };
  identification: {
    cnic_number: string;
    cnic_front_url: string;
    // ...
  };
  license: {
    license_number: string;
    license_type: string;
    // ...
  };
  // ... other sections
}
```

## Form Validation

Validation is handled per section:

1. **Step navigation**: `form.trigger()` validates current section
2. **Final submission**: All sections validated before submit
3. **Custom validation**: Can be added to individual fields using react-hook-form validation rules

### Adding Field-Level Validation

In any section component, update field config:

```typescript
{
  inputType: "input",
  name: "cnicNo",
  label: "CNIC Number",
  placeholder: "13-digit CNIC",
  // Add validation
  rules: {
    required: "CNIC number is required",
    pattern: {
      value: /^\d{5}-\d{7}-\d{1}$/,
      message: "Invalid CNIC format (XXXXX-XXXXXXX-X)"
    }
  }
}
```

## State Persistence

### Current Implementation

- Form state persists in memory during session
- Switching tabs does not lose data
- Page refresh loses data (unless using Zustand - see guide.md)

### With Zustand (Optional)

See `guide.md` for adding Zustand state management to persist form data across:
- Page refreshes
- Tab switches
- Browser sessions (with localStorage)

## Testing Data Flow

### Manual Testing

1. Fill Step 01 fields
2. Switch to Step 02 - data should persist
3. Fill Step 02 fields
4. Switch back to Step 01 - verify data still there
5. Complete all steps
6. Click "Create Driver" - check console for logged values

### API Integration Testing

1. Mock API endpoint
2. Add console.log in onSubmit to inspect payload
3. Verify file uploads work correctly
4. Test error handling
5. Test loading states

## Troubleshooting

### Data Not Persisting

- Ensure all sections use the same form instance
- Check that form values are not being reset unintentionally

### File Upload Issues

- Verify file size limits
- Check file type validation
- Ensure proper FormData encoding

### Validation Not Working

- Ensure `form.trigger()` is called before navigation
- Check field names match form schema exactly

