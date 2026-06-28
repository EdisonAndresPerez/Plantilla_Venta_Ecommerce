import { tesloApi } from "@/api/tesloApi";

export const createPaymentIntentAction = async (orderId: string) => {
  const { data } = await tesloApi.post<{
    clientSecret: string;
    paymentIntentId: string;
  }>("/payments/create-payment-intent", { orderId });
  return data;
};
