import { LoginForm } from "@/components/modules/auth/login/LoginFrom"
import "./login.css"

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page-orb2" aria-hidden />
      <LoginForm />
    </div>
  )
}