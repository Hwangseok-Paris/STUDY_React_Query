import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchRedWines = () => {
  return axios.get("https://api.sampleapis.com/wines/reds");
};

const fetchWhiteWines = () => {
  return axios.get("https://api.sampleapis.com/wines/whites");
};

export const ParallelQuery = () => {
  const onSuccess = (data) => {
    return data.data?.slice(0, 5);
  };
  const onError = (data) => {
    console.log("오류 발생 후 오류 이펙트 수행", data);
  };

  const convertData = (data) => {
    return data.data
      ?.filter((i) => i.id < 9)
      ?.map((p) => {
        return {
          id: p.id,
          name: p.wine,
        };
      });
  };

  const {
    data: redWineData,
    isLoading: redLoading,
    isError: isRedError,
    error: redError,
  } = useQuery("parallel-get-red-product", fetchRedWines, {
    onSuccess,
    onError,
    select: (data) => convertData(data),
  });
  const {
    data: whiteWineData,
    isLoading: whiteLoading,
    isError: isWhiteError,
    error: whiteError,
  } = useQuery("parallel-get-white-product", fetchWhiteWines, {
    onSuccess,
    onError,
    select: (data) => convertData(data),
  });

  //   if (redLoading) return <>RedWine Loading...</>;
  //   if (whiteLoading) return <>WhiteWine Loading...</>;
  if (isRedError) return <>{redError.message}</>;
  if (isWhiteError) return <>{whiteError.message}</>;

  return (
    <div>
      <h1 className="text-[20px] text-[red] mt-10 mb-1">RED WINE LIST</h1>
      {redLoading && <div className="text-[yellow] text-bold">RedWine Loading...</div>}
      {redWineData &&
        redWineData?.map((wines) => (
          <li key={wines.id}>
            <Link to={`/react-query/${wines.id}`}>{wines.name}</Link>
          </li>
        ))}

      <h1 className="text-[20px] text-[white] mt-10 mb-1">WHITE WINE LIST</h1>
      {whiteLoading && <div className="text-[yellow] text-bold">whiteLoading Loading...</div>}
      {whiteWineData &&
        whiteWineData.map((wines) => (
          <li key={wines.id}>
            <Link to={`/react-query/${wines.id}`}>{wines.name}</Link>
          </li>
        ))}
    </div>
  );
};
