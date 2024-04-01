import { useState, useEffect } from "react";
import axios from "axios";

export const AxiosQuery = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://api.sampleapis.com/wines/reds")
      .then((res) => {
        if (res.data.error) {
          setError(res.data.message);
          setIsLoading(false);
          return;
        }
        setData(res);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <>Loading...</>;

  if (error) return <h2 className="text-[red]">{error}</h2>;

  return (
    <>
      <div className="text-4xl">Axios Query</div>
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
