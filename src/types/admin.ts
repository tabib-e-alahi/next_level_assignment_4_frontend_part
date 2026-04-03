export type UserStatus = "ACTIVE" | "SUSPENDED";
export type UserRole = "CUSTOMER" | "PROVIDER";

export type AdminCustomer = {
  id: string
  name: string
  phone?: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  role: "CUSTOMER"
  _count: {
    orders: number
  };
};

export type AdminProvider = {
  id: string
  name: string
  phone?: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  role: "PROVIDER"
  providerProfiles: {
    _count: {
      meals: number
    }
  };
};

// type AdminUsersResponse = {
//   customers: AdminCustomer[];
//   providers: AdminProvider[];
// };

export type AdminOrder = {
  id: string;
  customerId: string;
  providerId: string;
  deliveryAddress: string;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string
  name: string
  slug?: string
  description?: string 
  image?: string 
  logo: string
  createdAt: string
  updatedAt: string
}

export type UpdateCategory = {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
};


export type AdminCategory = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
};
