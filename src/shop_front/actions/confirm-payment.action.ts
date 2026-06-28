import { tesloApi } from "@/api/tesloApi";

export const confirmPaymentAction = async (paymentIntentId: string) => {
  const { data } = await tesloApi.post<{ ok: boolean }>("/payments/confirm", {
    paymentIntentId,
  });
  return data;
};
