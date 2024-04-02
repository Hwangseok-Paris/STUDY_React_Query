import { useParams } from "react-router-dom";
import { useProductId } from "./hooks/useProductId";

export const ReactQueryDetails = () => {
  const { productId } = useParams();
  const { isLoading, isError, error, data } = useProductId(productId);
  console.log(data);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <>
      {data && (
        <div>
          <h1>ID : {data.data.id} </h1>
          <h1>NAME : {data.data.wine}</h1>
          <h1>WINERY : {data.data.winery} </h1>
          <img src={data.data.image} alt="" srcSet="" className="mt-[30px]" />
        </div>
      )}
    </>
  );
};
