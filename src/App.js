import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";

//
import DefaultLayout from "./layout/DefaultLayout";
import { publicRoutes } from "./routes/routes";
import { readCartTotal, readJWT } from "./services/apiUserService";
import jwtDecode from "./hooks/jwtDecode";
import { CountCartContext } from "./hooks/DataContext";

//
function App() {
  const { setCountCart } = useContext(CountCartContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchJWT(); }, []);
  const fetchJWT = async () => {
    let decoded = false
    const resJWT = await readJWT();
    if (resJWT?.DT?.jwt) {
      decoded = await jwtDecode(resJWT?.DT?.jwt)
      fetchCartWithId(decoded?.user?.id)
    }
  };
  const fetchCartWithId = async (idUser) => {
    const fetchCart = await readCartTotal(idUser)
    setCountCart(fetchCart.DT)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <ToastContainer autoClose={1000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
