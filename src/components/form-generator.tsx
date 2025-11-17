"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  type ControllerRenderProps,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ButtonOnlyProps = React.ComponentProps<typeof Button>;

type FormOption = {
  value: string;
  label: string;
  id?: string;
};

type CommonFieldConfig<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  render?: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => ReactNode;
};

type InputFieldConfig<TFieldValues extends FieldValues> = CommonFieldConfig<TFieldValues> & {
  inputType: "input";
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  inputProps?: React.ComponentProps<typeof Input>;
};

type TextareaFieldConfig<TFieldValues extends FieldValues> = CommonFieldConfig<TFieldValues> & {
  inputType: "textarea";
  rows?: number;
  textareaProps?: React.ComponentProps<typeof Textarea>;
};

type SelectFieldConfig<TFieldValues extends FieldValues> = CommonFieldConfig<TFieldValues> & {
  inputType: "select";
  options: FormOption[];
  selectProps?: React.ComponentProps<typeof Select>;
  emptyLabel?: string;
};

export type FieldConfig<TFieldValues extends FieldValues> =
  | InputFieldConfig<TFieldValues>
  | TextareaFieldConfig<TFieldValues>
  | SelectFieldConfig<TFieldValues>;

export type FormSectionConfig<TFieldValues extends FieldValues> = {
  id: string;
  title: string;
  description?: string;
  layoutClassName?: string;
  fields: FieldConfig<TFieldValues>[];
  cardClassName?: string;
};

type FormGeneratorBaseProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  submitLabel?: string;
  submitButtonProps?: ButtonOnlyProps;
  actions?: ReactNode;
  className?: string;
};

type FormGeneratorProps<TFieldValues extends FieldValues> =
  | (FormGeneratorBaseProps<TFieldValues> & {
      fields: FieldConfig<TFieldValues>[];
      sections?: never;
      formClassName?: string;
    })
  | (FormGeneratorBaseProps<TFieldValues> & {
      sections: FormSectionConfig<TFieldValues>[];
      fields?: never;
      formClassName?: never;
    });

export const FormGenerator = <TFieldValues extends FieldValues>({
  form,
  fields,
  sections,
  onSubmit,
  submitLabel = "Submit",
  submitButtonProps,
  actions,
  className,
  formClassName,
}: FormGeneratorProps<TFieldValues>) => {
  const renderWithSections = Array.isArray(sections);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {renderWithSections ? (
          <div className="space-y-8">
            {sections?.map((section) => (
              <Card
                key={section.id}
                className={cn(
                  "border-border/60 bg-card/70 shadow-none backdrop-blur",
                  section.cardClassName,
                )}
              >
                {(section.title || section.description) && (
                  <CardHeader>
                    {section.title && <CardTitle>{section.title}</CardTitle>}
                    {section.description && (
                      <CardDescription>{section.description}</CardDescription>
                    )}
                  </CardHeader>
                )}
                <CardContent>
                  {renderFieldsGrid({
                    form,
                    fields: section.fields,
                    layoutClassName: section.layoutClassName,
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className={cn("space-y-6", formClassName)}>
            {renderFieldsGrid({ form, fields: fields ?? [] })}
          </div>
        )}

        {actions ?? (
          <Button type="submit" {...submitButtonProps}>
            {submitLabel}
          </Button>
        )}
      </form>
    </Form>
  );
};

const renderFieldsGrid = <TFieldValues extends FieldValues>({
  form,
  fields,
  layoutClassName,
}: {
  form: UseFormReturn<TFieldValues>;
  fields: FieldConfig<TFieldValues>[];
  layoutClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
        layoutClassName,
      )}
    >
      {fields.map((fieldConfig) => (
        <FormField
          key={fieldConfig.name}
          control={form.control}
          name={fieldConfig.name}
          render={({ field }) => (
            <FormItem className={fieldConfig.className}>
              {fieldConfig.label && <FormLabel>{fieldConfig.label}</FormLabel>}
              <FormControl>{renderFieldControl(fieldConfig, field)}</FormControl>
              {fieldConfig.description && (
                <FormDescription>{fieldConfig.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

const renderFieldControl = <TFieldValues extends FieldValues>(
  fieldConfig: FieldConfig<TFieldValues>,
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
) => {
  if (fieldConfig.render) {
    return fieldConfig.render(field);
  }

  switch (fieldConfig.inputType) {
    case "textarea":
      return (
        <Textarea placeholder={fieldConfig.placeholder} rows={fieldConfig.rows} disabled={fieldConfig.disabled} {...field} {...fieldConfig.textareaProps} />
      );
    case "select":
      return (
        <Select disabled={fieldConfig.disabled} onValueChange={field.onChange} value={(field.value as string) ?? ""} {...fieldConfig.selectProps} >
          <SelectTrigger>
            <SelectValue placeholder={fieldConfig.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options.length ? (
              fieldConfig.options.map((option) => (
                <SelectItem
                  key={option.id ?? option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="__empty__" disabled>
                {fieldConfig.emptyLabel ?? "No options available"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      );
    case "input":
    default:
      return (
        <Input
          type={fieldConfig.type}
          placeholder={fieldConfig.placeholder}
          disabled={fieldConfig.disabled}
          {...field}
          {...fieldConfig.inputProps}
        />
      );
  }
};
