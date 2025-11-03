// app/actions/auth.ts
"use server";

import { z } from "zod";
import { authClient } from "@/lib/auth-client"; // Your Better Auth instance

const signInSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const sendVerifyOTPSchema = z.object({
  email: z.email("Please enter a valid email address"),
  type: z.enum(["sign-in", "forget-password", "email-verification"]),
});
export async function signInAction(data: z.infer<typeof signInSchema>) {
  const validatedFields = signInSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const { data: signInData, error } = await authClient.signIn.email({
    email: email, // required
    password: password, // required
    rememberMe: true,
    callbackURL: "/dashboard",
  });

  if (error) {
    return {
      errors: {
        root: [error.message],
      },
    };
  }

  return signInData;
}
export async function sendSignInOTP(data: z.infer<typeof sendVerifyOTPSchema>) {
  const { data: sendSignInOTPData, error } =
    await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: data.type as "sign-in" | "forget-password" | "email-verification",
    });

  if (error) {
    console.error("[sendSignInOTP]: Failed to send OTP:", error);
    return {
      errors: {
        root: [error.message],
      },
    };
  }
  // OTP sent successfully
  console.log("[sendSignInOTP]: OTP sent to email");
  return sendSignInOTPData;
}

const verifyPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function verifyPassword(
  data: z.infer<typeof verifyPasswordSchema>,
) {
  const validatedFields = verifyPasswordSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // Try to sign in to verify the password is correct
  const { data: signInData, error } = await authClient.signIn.email({
    email: email,
    password: password,
  });

  if (error) {
    console.error("[verifyPassword]: Password verification failed:", error);
    return {
      errors: {
        root: [error.message],
      },
    };
  }

  console.log("[verifyPassword]: Password verified successfully");
  return { success: true, user: signInData };
}

export async function getSession() {
  const session = await authClient.getSession();
  return session;
}

const verifyOTPSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export async function verifyOTPAndSignIn(
  data: z.infer<typeof verifyOTPSchema>,
) {
  const validatedFields = verifyOTPSchema.safeParse({
    email: data.email,
    otp: data.otp,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, otp } = validatedFields.data;

  const { data: signInData, error } = await authClient.signIn.emailOtp({
    email: email,
    otp: otp,
  });

  if (error) {
    console.error("[verifyOTPAndSignIn]: OTP verification failed:", error);
    return {
      errors: {
        root: [error.message],
      },
    };
  }

  // User successfully signed in
  console.log("[verifyOTPAndSignIn]: User signed in successfully");
  return signInData;
}
