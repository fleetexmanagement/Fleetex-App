import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export default function OTPForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div
          className={cn("flex flex-col gap-6 md:min-h-[450px]", className)}
          {...props}
        >
          <Card className="flex-1 overflow-hidden p-0">
            <CardContent className="grid flex-1 p-0 md:grid-cols-2">
              <form className="flex flex-col items-center justify-center p-6 md:p-8">
                <FieldGroup>
                  <Field className="items-center text-center">
                    <h1 className="text-2xl font-bold">
                      Enter verification code
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      We sent a 6-digit code to your email
                    </p>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="otp" className="sr-only">
                      Verification code
                    </FieldLabel>
                    <InputOTP
                      maxLength={6}
                      id="otp"
                      required
                      containerClassName="gap-4"
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
                    <FieldDescription className="text-center">
                      Enter the 6-digit code sent to your email.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit">Verify</Button>
                    <FieldDescription className="text-center">
                      Didn&apos;t receive the code? <Link href="#">Resend</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/fleetx_logo.png"
                  width={500}
                  height={500}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="text-center">
            By clicking continue, you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
