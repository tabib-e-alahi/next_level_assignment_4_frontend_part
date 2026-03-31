import { Role } from '@/constants/roles';

export type User = {
  name: string
  email: string
  id: string
  role: Role
  status: "ACTIVE" | "SUSPENDED"
}