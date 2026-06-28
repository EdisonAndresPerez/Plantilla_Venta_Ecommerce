export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  items: OrderItem[];
  total: number;
  totalItems: number;
  status: string;
  paid: boolean;
  stripePaymentIntentId?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
  createdAt: string;
}
