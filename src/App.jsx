import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import ListEmployees from './pages/ListEmployees';
import Error404 from './pages/Error404';
import Layout from './components/Layout';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import SelectMenu from './components/SelectMenu';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home />}
        />

        <Route
          path="/employees"
          element={<ListEmployees />}
          errorElement={<Error404 />}
        />  

        <Route
          path="/test"
          element={<SelectMenu />}
          errorElement={<Error404 />}
        />  

        <Route path="/*" element={<Error404 />} />
      </Route>,
    ),
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App
