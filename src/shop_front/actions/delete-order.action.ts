import { tesloApi } from "@/api/tesloApi";

export const deleteOrderAction = async (orderId: string) => {
  await tesloApi.delete(`/orders/${orderId}`);
};
