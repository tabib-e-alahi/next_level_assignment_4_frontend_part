"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import {
      Field,
      FieldDescription,
      FieldError,
      FieldGroup,
      FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Rubik } from 'next/font/google';
import {
      InputGroup,
} from "@/components/ui/input-group"
import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select"
import { registerUser } from "@/services/auth"

const rubik = Rubik({
      subsets: ["latin"],
})


const formSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.email(),
      role: z.enum(["CUSTOMER", "PROVIDER"]),
      password: z.string().min(6),
      confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
});

// type RegisterFormValues = z.infer<typeof formSchema>

export function RegisterForm() {
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  name: "",
                  email: "",
                  role: "CUSTOMER",
                  password: "",
                  confirmPassword: "",
            },
      })

      async function onSubmit(data: z.infer<typeof formSchema>) {
            try {
                  const payload = {
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        password: data.password,
                  }

                  // toast("Registration form submitted", {
                  //       description: (
                  //             <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                  //                   <code>{JSON.stringify(payload, null, 2)}</code>
                  //             </pre>
                  //       ),
                  //       position: "bottom-right",
                  //       classNames: {
                  //             content: "flex flex-col gap-2",
                  //       },
                  //       style: {
                  //             "--border-radius": "calc(var(--radius) + 4px)",
                  //       } as React.CSSProperties,
                  // })

                  // later replace with real API call
                  // await registerUser(payload)
                  const res = await registerUser(payload);
                  console.log(res);
            } catch(error) {
                  // toast.error("Registration failed. Please try again.")
                  console.log(error);
            }
      }

      return (
            <Card className={`w-full sm:max-w-md mx-auto ${rubik.className}`}>
                  <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
                        <CardDescription>
                              Register as a customer or provider to start using <Link href="/" className="font-extrabold text-[#f60]">Platera</Link>.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                              <FieldGroup>
                                    <Controller
                                          name="name"
                                          control={form.control}
                                          render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                      <FieldLabel htmlFor="register-name">Full Name</FieldLabel>
                                                      <Input
                                                            {...field}
                                                            id="register-name"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder="John Doe"
                                                            autoComplete="name"
                                                      />
                                                      {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                      )}
                                                </Field>
                                          )}
                                    />

                                    <Controller
                                          name="email"
                                          control={form.control}
                                          render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                      <FieldLabel htmlFor="register-email">Email</FieldLabel>
                                                      <Input
                                                            {...field}
                                                            id="register-email"
                                                            type="email"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder="you@example.com"
                                                            autoComplete="email"
                                                      />
                                                      {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                      )}
                                                </Field>
                                          )}
                                    />

                                    <Controller
                                          name="role"
                                          control={form.control}
                                          render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                      <FieldLabel htmlFor="register-role">Register As</FieldLabel>
                                                      <Select
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                      >
                                                            <SelectTrigger
                                                                  id="register-role"
                                                                  aria-invalid={fieldState.invalid}
                                                            >
                                                                  <SelectValue placeholder="Select your role" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                                                                  <SelectItem value="PROVIDER">Provider</SelectItem>
                                                            </SelectContent>
                                                      </Select>
                                                      <FieldDescription>
                                                            Choose how you want to use the platform.
                                                      </FieldDescription>
                                                      {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                      )}
                                                </Field>
                                          )}
                                    />

                                    <Controller
                                          name="password"
                                          control={form.control}
                                          render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                      <FieldLabel htmlFor="register-password">Password</FieldLabel>
                                                      <InputGroup>
                                                            <Input
                                                                  {...field}
                                                                  id="register-password"
                                                                  type="password"
                                                                  aria-invalid={fieldState.invalid}
                                                                  placeholder="Create a password"
                                                                  autoComplete="new-password"
                                                            />
                                                      </InputGroup>
                                                      <FieldDescription>
                                                            Use at least 6 characters.
                                                      </FieldDescription>
                                                      {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                      )}
                                                </Field>
                                          )}
                                    />

                                    <Controller
                                          name="confirmPassword"
                                          control={form.control}
                                          render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                      <FieldLabel htmlFor="register-confirm-password">
                                                            Confirm Password
                                                      </FieldLabel>
                                                      <Input
                                                            {...field}
                                                            id="register-confirm-password"
                                                            type="password"
                                                            aria-invalid={fieldState.invalid}
                                                            placeholder="Re-enter your password"
                                                            autoComplete="new-password"
                                                      />
                                                      {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                      )}
                                                </Field>
                                          )}
                                    />
                              </FieldGroup>
                        </form>
                  </CardContent>

                  <CardFooter className="flex flex-col items-stretch gap-4">
                        <Field orientation="horizontal">
                              <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={form.formState.isSubmitting}
                              >
                                    Reset
                              </Button>
                              <Button
                                    type="submit"
                                    form="register-form"
                                    disabled={form.formState.isSubmitting}
                              >
                                    {form.formState.isSubmitting ? "Creating..." : "Register"}
                              </Button>
                        </Field>

                        <p className="text-center text-sm text-muted-foreground">
                              Already have an account?{" "}
                              <Link href="/login" className="font-medium text-foreground hover:underline">
                                    Login
                              </Link>
                        </p>
                  </CardFooter>
            </Card>
      )
}