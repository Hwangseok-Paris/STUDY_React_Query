import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="mb-4 flex space-x-5 border-b-2 py-2">
      <Link to="/">Home</Link>
      <Link to="/axios-query">Axios Query</Link>
      <Link to="/react-query">React Query</Link>
      <Link to="/parallel-query">Parallel Query</Link>
      <Link to="/dynamic-parallel-qureis">Dynamic Parallel Queries</Link>
      <Link to="/depent-query">Depent Query</Link>
    </nav>
  );
};
