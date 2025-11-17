"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

const credentialsFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpFormSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function LoginPage() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const credentialsForm = useForm<z.infer<typeof credentialsFormSchema>>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onVerifyCredentials(
    data: z.infer<typeof credentialsFormSchema>,
  ) {
    setLoading(true);
    setError("");

    try {
      // First verify the password
      const { error: passwordError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (passwordError) {
        setError(passwordError.message || "Invalid email or password");
        toast.error(passwordError.message || "Invalid email or password");
        return;
      }

      // If password is correct, send OTP
      const { error: otpError } = await authClient.emailOtp.sendVerificationOtp(
        {
          email: data.email,
          type: "sign-in" as const,
        },
      );

      if (otpError) {
        setError(otpError.message || "Failed to send OTP");
        toast.error(otpError.message || "Failed to send OTP");
        return;
      }

      setEmail(data.email);
      setStep("otp");
      toast.success("OTP sent to your email");
    } catch (err) {
      const errorMessage = "Authentication failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyOTP(data: z.infer<typeof otpFormSchema>) {
    setLoading(true);
    setError("");

    try {
      const { error: verifyOTPError } = await authClient.signIn.emailOtp({
        email: email,
        otp: data.otp,
      });

      if (verifyOTPError) {
        setError(verifyOTPError.message || "Invalid OTP");
        toast.error(verifyOTPError.message || "Invalid OTP");
        return;
      }

      toast.success("Login successful");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMessage = "OTP verification failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Fleetex.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {step === "credentials" ? (
              <Form {...credentialsForm}>
                <form
                  onSubmit={credentialsForm.handleSubmit(onVerifyCredentials)}
                  className="flex flex-col gap-6"
                >
                  <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h1 className="text-2xl font-bold">
                        Login to your account
                      </h1>
                      <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                      </p>
                    </div>
                    <Field>
                      <FormField
                        control={credentialsForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={credentialsForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FieldLabel htmlFor="password">
                                Password
                              </FieldLabel>
                              <Link
                                href="/forgot-password"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </Link>
                            </div>
                            <FormControl>
                              <Input id="password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Field>
                    {error && (
                      <FieldDescription className="text-destructive text-center">
                        {error}
                      </FieldDescription>
                    )}
                    <Field>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                      >
                        {loading ? "Verifying..." : "Login"}
                      </Button>
                    </Field>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="underline underline-offset-4"
                      >
                        Sign up
                      </Link>
                    </FieldDescription>
                  </FieldGroup>
                </form>
              </Form>
            ) : (
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(onVerifyOTP)}
                  className="flex flex-col gap-6"
                >
                  <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h1 className="text-2xl font-bold">
                        Enter verification code
                      </h1>
                      <p className="text-muted-foreground text-sm text-balance">
                        We sent a 6-digit code to {email}
                      </p>
                    </div>
                    <Field className="flex flex-col items-center gap-4">
                      <FieldLabel htmlFor="otp" className="sr-only">
                        Verification code
                      </FieldLabel>
                      <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem className="w-full items-center flex justify-center">
                            <FormControl className="">
                              <InputOTP
                                maxLength={6}
                                id="otp"
                                required
                                containerClassName="gap-4"
                                {...field}
                              >
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                  <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                  <InputOTPSlot index={5} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {error && (
                        <FieldDescription className="text-destructive w-full items-center flex justify-center">
                          {error}
                        </FieldDescription>
                      )}
                      <FieldDescription className="text-center">
                        Enter the 6-digit code sent to your email.
                      </FieldDescription>
                    </Field>
                    <div className="flex flex-col gap-4">
                      <Field>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full"
                        >
                          {loading ? "Verifying..." : "Verify OTP"}
                        </Button>
                      </Field>
                      <Field>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setStep("credentials");
                            setError("");
                            setEmail("");
                            credentialsForm.reset();
                            otpForm.reset();
                          }}
                          disabled={loading}
                          className="w-full"
                        >
                          Back
                        </Button>
                      </Field>
                      <FieldDescription className="text-center">
                        Didn&apos;t receive the code?{" "}
                        <Link
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            const { error: otpError } =
                              await authClient.emailOtp.sendVerificationOtp({
                                email: email,
                                type: "sign-in",
                              });
                            if (otpError) {
                              toast.error(
                                otpError.message || "Failed to send OTP",
                              );
                            } else {
                              toast.success("OTP resent to your email");
                            }
                          }}
                          className="underline underline-offset-4"
                        >
                          Resend
                        </Link>
                      </FieldDescription>
                    </div>
                  </FieldGroup>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/fleetx_logo.png"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
