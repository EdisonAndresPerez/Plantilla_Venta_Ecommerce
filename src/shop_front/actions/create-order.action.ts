import { tesloApi } from "@/api/tesloApi";
import type { Order } from "@/interfaces/order.interface";

export interface CreateOrderInput {
  items: {
    productId: string;
    productTitle: string;
    productPrice: number;
    productImage: string;
    size: string;
    quantity: number;
  }[];
  total: number;
  totalItems: number;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

export const createOrderAction = async (
  input: CreateOrderInput,
): Promise<Order> => {
  const { data } = await tesloApi.post<Order>("/orders", input);
  return data;
};
