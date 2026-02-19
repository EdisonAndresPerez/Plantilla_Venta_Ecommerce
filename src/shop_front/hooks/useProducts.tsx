import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products-action";
import { useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 0;

  const offset = page ? (Number(page) - 1) * Number(limit) : 0;

  return useQuery({
    queryKey: ["products", { limit, offset }],
    queryFn: () =>
      getProductsAction({
        limit: limit,
        offset: offset,
      }),
  });
};
