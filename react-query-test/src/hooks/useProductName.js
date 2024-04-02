import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = () => {
  return axios.get("https://api.sampleapis.com/wines/reds");
};

// onSuccess, onError 는 이 함수를 호출하는 컴포넌트에서 호출하는게 용이함.
export const useProductName = (onSuccess, onError) => {
  return useQuery("get-product", fetchProducts, {
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const productName = data.data?.map((p) => p.wine).slice(0, 9);
    //   return productName;
    // },
    select: (data) => {
      return data.data.slice(0, 9);
    },
  });
};
