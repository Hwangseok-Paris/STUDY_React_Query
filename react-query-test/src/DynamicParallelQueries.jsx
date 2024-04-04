import { useQueries } from "react-query";
import axios from "axios";

const fetchProducts = (productId) => {
  return axios.get(`https://api.sampleapis.com/wines/reds/${productId}`);
};

export const DynamicParallelQueries = ({ productIds }) => {
  console.log(productIds);
  const results = useQueries(
    productIds.map((id) => {
      return {
        queryKey: ["get-product", id],
        queryFn: () => fetchProducts(id),
      };
    }),
  );

  console.log(results);

  return <div>DynamicParallelQuries</div>;
};
