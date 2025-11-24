# Driver Management Components

## Overview

This directory contains the refactored multi-step driver form system. The form has been split into 4 separate section components, each rendered in its own tab.

## File Structure

```
driver-management/
├── README.md                              # This file
├── form-types.ts                          # TypeScript types and default values
├── form-constants.ts                      # Shared constants and options
├── file-upload-control.tsx                # Reusable file upload component
├── driver-tabs.tsx                        # Main tabs component (manages all steps)
├── sections/
│   ├── driver-information-section.tsx     # Step 01: Driver Information
│   ├── identification-licensing-section.tsx # Step 02: Identification & Licensing
│   ├── health-compliance-section.tsx      # Step 03: Health & Compliance
│   └── experience-references-section.tsx  # Step 04: Experience & References
└── add-driver-form.tsx                    # Original form (kept for reference)
```

## Component Architecture

### 1. DriverTabs Component (`driver-tabs.tsx`)

**Main Component** that orchestrates the entire form:
- Manages single form instance (react-hook-form)
- Controls tab navigation between 4 steps
- Handles form submission
- Validates form before step navigation

**Usage**:
```tsx
import { DriverTabs } from "@/components/driver-management/driver-tabs";

<DriverTabs />
```

### 2. Section Components

Each section is a standalone component that receives the form instance as a prop:

#### Step 01: Driver Information
**File**: `sections/driver-information-section.tsx`
- Driver image upload
- Personal information (name, DOB, address)
- Contact information
- Basic qualifications

#### Step 02: Identification & Licensing
**File**: `sections/identification-licensing-section.tsx`
- CNIC details and images
- Driving license information
- DDC certificates

#### Step 03: Health & Compliance
**File**: `sections/health-compliance-section.tsx`
- Vaccination status
- Medical certificates
- Drug/alcohol test results

#### Step 04: Experience & References
**File**: `sections/experience-references-section.tsx`
- Previous employment
- Vehicle experience
- References

### 3. Shared Components

#### Form Types (`form-types.ts`)
- `DriverFormValues` type definition
- `defaultDriverFormValues` initial state

#### Form Constants (`form-constants.ts`)
- Dropdown options (marital status, blood group, etc.)
- Helper functions for formatting labels

#### File Upload Control (`file-upload-control.tsx`)
- Reusable file upload component
- Used across all sections for image/document uploads

## How It Works

### Form State Management

1. **Single Form Instance**: One react-hook-form instance in `DriverTabs`
2. **Shared Across Sections**: Each section component receives the same form instance
3. **Persistent State**: Form values persist when switching between tabs
4. **Validation**: Each step validates before moving to next

### Navigation Flow

```
Step 01 → Step 02 → Step 03 → Step 04
   ↑         ↑         ↑         ↑
Previous  Previous  Previous  Submit
```

- Each step has "Next" button (validates before navigation)
- Steps 02-04 have "Previous" button
- Step 04 has "Create Driver" submit button

### Data Flow

1. User fills Step 01 → form state updated
2. User clicks "Next" → validation runs → if valid, move to Step 02
3. User fills Step 02 → form state updated (Step 01 data still present)
4. User can navigate back → previous data still there
5. All steps complete → Submit → `onSubmit` handler called

## Usage Example

```tsx
// In your page component
import { DriverTabs } from "@/components/driver-management/driver-tabs";

export default function AddDriverPage() {
  return (
    <div className="space-y-6">
      <SiteHeader title="Add Driver" />
      <DriverTabs />
    </div>
  );
}
```

## Customization

### Adding Field Validation

In any section component, add validation rules:

```typescript
{
  inputType: "input",
  name: "cnicNo",
  label: "CNIC Number",
  placeholder: "13-digit CNIC",
  // Add custom validation
  rules: {
    required: "CNIC is required",
    pattern: {
      value: /^\d{5}-\d{7}-\d{1}$/,
      message: "Invalid CNIC format"
    }
  }
}
```

### Modifying Form Submission

Edit `onSubmit` handler in `driver-tabs.tsx`:

```typescript
const onSubmit: SubmitHandler<DriverFormValues> = async (values) => {
  // Your API call here
  const response = await fetch('/api/drivers', {
    method: 'POST',
    body: JSON.stringify(values),
  });
  
  // Handle response
};
```

### Adding New Section

1. Create new section component in `sections/` directory
2. Add tab in `driver-tabs.tsx`
3. Import and use in tabs component

## Documentation

- **Data Flow**: See `docs/DRIVER_FORM_DATA_FLOW.md`
- **Zustand Guide**: See `docs/guide.md` for state persistence
- **API Integration**: See data flow documentation

## Benefits

✅ **Modular**: Each section is a separate component  
✅ **Maintainable**: Easy to update individual sections  
✅ **Reusable**: Section components can be used independently  
✅ **Type-Safe**: Full TypeScript support  
✅ **Persistent**: Form data persists across tab switches  
✅ **Validated**: Step-by-step validation  
✅ **Organized**: Clear separation of concerns  

## Migration Notes

The original `add-driver-form.tsx` has been kept for reference. The new structure:
- Splits the monolithic form into 4 components
- Uses tabs for better UX
- Maintains the same form schema
- Preserves all field configurations

