import React, { lazy, Suspense } from "react";
import { useRoutes, Navigate, RouteObject, Link } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/" /> },
];

const App: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
      {element}
    </>
  );
};

export default App;
