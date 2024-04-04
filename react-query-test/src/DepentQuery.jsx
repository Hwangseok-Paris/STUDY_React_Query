import { useQuery } from "react-query";
import axios from "axios";

export const DepentQuery = ({ id }) => {
  const fetchWineById = (id) => {
    return axios.get(`https://api.sampleapis.com/wines/reds/${id}`);
  };

  const fetchProductsByWineryName = (wineryName) => {
    return axios.get(`https://api.sampleapis.com/wines/reds/?winery=${wineryName}`);
  };

  const { data: wine } = useQuery(["get-wine", id], () => fetchWineById(id));
  const wineryName = wine?.data.winery;

  const { data: wineryProducts } = useQuery(
    ["get-product-by-winery", wineryName],
    () => fetchProductsByWineryName(wineryName),
    {
      enabled: !!wineryName,
    },
  );

  return (
    <>
      <div>Dependent queries</div>

      <div>
        {wineryProducts && wineryProducts.data?.map((p) => <div key={p.id}>{p.wine} </div>)}
      </div>
    </>
  );
};
