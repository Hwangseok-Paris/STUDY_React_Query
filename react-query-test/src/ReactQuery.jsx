import { useQuery } from "react-query";
import axios from "axios";

const fetchProducts = () => {
  return axios.get("https://api.sampleapis.com/wines/reds");
};

export const ReactQuery = () => {
  const { isLoading, isFetching, data, isError, error } = useQuery("get-product", fetchProducts, {
    // staleTime: 3000,
    // refetchOnMount: true, // mount시에 fetch 작동
    // refetchOnWindowFocus: true, // 유저가 해당 컴포넌트에 포커스 했을 경우 refetch 실행
    // refetchInterval: 2000,  // 사용자의 동작에 관계 없이 지정된 시간마다 refetch(default - false)
    // refetchIntervalInBackground: true,  //  ture로 지정했을 경우에는 백그라운드에 있을 때에도 refetch(default - false)
  });

  console.log({ isLoading, isFetching });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  if (data.data.error == 500) {
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
