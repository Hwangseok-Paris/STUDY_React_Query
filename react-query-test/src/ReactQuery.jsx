// import { useQuery } from "react-query";
// import axios from "axios";
import { useProductName } from "./hooks/useProductName";

// const fetchProducts = () => {
//   return axios.get("https://api.sampleapis.com/wines/reds");
// };

export const ReactQuery = () => {
  const onSuccess = (data) => {
    console.log("데이터 가져오기 후 사이드 이펙트 수행", data);
  };

  const onError = (data) => {
    console.log("오류 발생 후 오류 이펙트 수행", data);
  };

  const { isLoading, isFetching, data, isError, error } = useProductName(onSuccess, onError);
  // const { isLoading, isFetching, data, isError, error } = useQuery("get-product", fetchProducts, {
  //   // staleTime: 3000,
  //   // refetchOnMount: true, // mount시에 fetch 작동
  //   // refetchOnWindowFocus: true, // 유저가 해당 컴포넌트에 포커스 했을 경우 refetch 실행
  //   // refetchInterval: 2000,  // 사용자의 동작에 관계 없이 지정된 시간마다 refetch(default - false)
  //   // refetchIntervalInBackground: true,  //  ture로 지정했을 경우에는 백그라운드에 있을 때에도 refetch(default - false)
  //   // enabled: false,
  //   onSuccess, // 성공 콜백
  //   onError, // 실패 콜백
  //   select: (data) => {
  //     const productName = data.data?.map((p) => p.wine).slice(0, 9);
  //     return productName;
  //   },
  //   // onSuccess: onSuccess,
  //   // onError: onError,
  // });

  console.log({ isLoading, isFetching });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  if (data && data.data?.error == 500) {
    return <div className="text-[red]">{data.data?.message}</div>;
  }

  return (
    <>
      <div className="text-4xl">React Query</div>

      {/* <button onClick={refetch} className="py-2 px-4 border bg-slate-100 rounded-md text-[black]">
        fetch data
      </button> */}

      <ul className="list-disc p-4">
        {/* {data &&
          data.data?.map((product) => (
            <li key={product.id}>
              {product.wine} / {product.winery}
            </li>
          ))} */}
        {data && data.map((productName) => <li key={productName}>{productName}</li>)}
      </ul>
    </>
  );
};
