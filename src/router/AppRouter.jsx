import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, Todos } from '../pages';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/todos', element: <Todos /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
