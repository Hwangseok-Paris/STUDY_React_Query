import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AxiosQuery } from "./AxiosQuery";
import { ReactQuery } from "./ReactQuery";
import { ReactQueryDevtools } from "react-query/devtools";
import { ReactQueryDetails } from "./ReactQueryDetails";
import { ParallelQuery } from "./ParallelQuery";
import { DynamicParallelQueries } from "./DynamicParallelQueries";
import { DepentQuery } from "./DepentQuery";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/axios-query" element={<AxiosQuery />} />
          <Route path="/react-query" element={<ReactQuery />} />
          <Route path="/react-query/:productId" element={<ReactQueryDetails />} />
          <Route path="/parallel-query" element={<ParallelQuery />} />
          <Route
            path="/dynamic-parallel-qureis"
            element={<DynamicParallelQueries productIds={["1", "2"]} />}
          />
          <Route path="/depent-query" element={<DepentQuery id="4" />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
