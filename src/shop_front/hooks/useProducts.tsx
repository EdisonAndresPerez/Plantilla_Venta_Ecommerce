import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products-action";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();


  const limit = searchParams.get("limit") || "9";
  const page = searchParams.get("page") || "1";
  const sizes = searchParams.get("sizes") || "";

  const price = searchParams.get("price") || "any";
  const search = searchParams.get("search") || "";
  console.log(search)

  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  switch(price) {
    case 'any':
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined;
      break;
  }


  //console.log(gender, sizes, price, search);


  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ["products", { limit, offset, sizes, gender, minPrice, maxPrice, search }],
    queryFn: () =>
      getProductsAction({
        limit: limit,
        offset: offset,
        sizes: sizes,
        gender: gender,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search,
      }),
  });
};
