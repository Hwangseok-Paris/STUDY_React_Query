import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchProductDetails = async (productId) => {
  const wineInfo = await axios.get(`https://api.sampleapis.com/wines/reds/${productId}`);
  return wineInfo;
};

export const useProductId = (productId) => {
  /**
   * useQueryClient, initialData 옵션 활용하기
   * 2024. 4. 4
   * https://mycodings.fly.dev/blog/2023-09-24-react-query-usequeryclient-initialdata-using-cache
   */

  const queryClient = useQueryClient();
  return useQuery(["product-id", productId], () => fetchProductDetails(productId), {
    initialData: () => {
      // console.log(queryClient.getQueryData("get-product")?.data);
      const product = queryClient
        .getQueryData("get-product")
        ?.data.find((p) => p.id === Number(productId));

      if (product) {
        console.log("product", product);
        return {
          data: product,
        };
      } else {
        console.log("undefined");
        return undefined;
      }
    },
  });

  // 이전 내역
  // return useQuery(["product-id", productId], () => fetchProductDetails(productId));
};
