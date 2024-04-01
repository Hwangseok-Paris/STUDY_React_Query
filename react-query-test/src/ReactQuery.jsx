import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = () => {
  return axios.get("https://api.sampleapis.com/wines/reds");
};

export const ReactQuery = () => {
  const { isLoading, data, isError, error } = useQuery("get-product", fetchProducts);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  if (data.data.error == 500) {
    console.log(isError);
    return <div className="text-[red]">{data.data?.message}</div>;
  }

  return (
    <>
      <div className="text-4xl">React Query</div>

      <ul className="list-disc p-4">
        {data &&
          data.data?.map((product) => (
            <li key={product.id}>
              {product.wine} / {product.winery}
            </li>
          ))}
      </ul>
    </>
  );
};
