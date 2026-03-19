"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup } from "@/components/ui/input-group"

import { loginUser } from "@/services/auth"
import "@/app/(auth)/login/login.css"

const formSchema = z.object({
  email:    z.email(),
  password: z.string(),
})

export function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const payload = { email: data.email, password: data.password }

      const res = await loginUser(payload)
      console.log(res)

      if (res?.success) {
        toast.success("Login successful!")
        form.reset()

        const role = res?.data?.user?.role
        if (role === "CUSTOMER")       router.push("/")
        else if (role === "PROVIDER")  router.push("/provider/dashboard")
      } else {
        toast.error(res?.message || "Login failed. Please check your credentials and try again.")
      }
    } catch {
      toast.error("Login failed. Please check your credentials and try again.")
    }
  }

  return (
    <Card className="login-card">
      {/* ── HEADER ── */}
      <CardHeader className="login-card-header">
        <div className="login-eyebrow">
          <span className="login-eyebrow-dot" />
          Welcome back
        </div>

        <h1 className="login-title">
          Sign in to <em>Platera</em>
        </h1>

        <p className="login-desc">
          New here?{" "}
          <Link href="/register">Create a free account</Link>
          {" "}and start ordering.
        </p>
      </CardHeader>

      {/* ── FORM ── */}
      <CardContent className="login-card-content">
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="login-field-group">

            {/* EMAIL */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="login-field" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email" className="login-field-label">
                    Email address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="login-input"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="login-field-error"
                    />
                  )}
                </Field>
              )}
            />

            {/* PASSWORD */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="login-field" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password" className="login-field-label">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your password"
                      autoComplete="current-password"
                      className="login-input"
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="login-field-error"
                    />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      {/* ── FOOTER ── */}
      <CardFooter className="login-card-footer">
        <div className="login-btn-row">
          <Button
            type="button"
            className="login-btn-reset"
            onClick={() => form.reset()}
            disabled={form.formState.isSubmitting}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="login-form"
            className="login-btn-submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Authenticating…" : "Sign In"}
          </Button>
        </div>

        <p className="login-footer-link">
          Don't have an account?{" "}
          <Link href="/register">Register</Link>
        </p>
      </CardFooter>
    </Card>
  )
}