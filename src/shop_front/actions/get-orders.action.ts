import { tesloApi } from "@/api/tesloApi";
import type { Order } from "@/interfaces/order.interface";

export const getOrdersAction = async (): Promise<Order[]> => {
  const { data } = await tesloApi.get<Order[]>("/orders");
  return data;
};

export const getOrderByIdAction = async (id: string): Promise<Order> => {
  const { data } = await tesloApi.get<Order>(`/orders/${id}`);
  return data;
};
