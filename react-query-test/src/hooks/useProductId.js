import { useQuery } from "react-query";
import axios from "axios";

const fetchProductDetails = async (productId) => {
  const wineInfo = await axios.get(`https://api.sampleapis.com/wines/reds/${productId}`);
  console.log(wineInfo.data);
  return wineInfo;
};

export const useProductId = (productId) => {
  return useQuery(["product-id", productId], () => fetchProductDetails(productId));
};
