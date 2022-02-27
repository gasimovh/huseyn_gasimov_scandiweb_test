import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/NavBar";
import ProductListingPage from "./pages/ProductListingPage";
import CartPage from "./pages/CartPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/cart" component={CartPage}></Route>
            <Route
              path="/products/:id"
              component={ProductDescriptionPage}
            ></Route>
            <Route path="/404" component={NotFoundPage} />
            <Route exact path="/" component={ProductListingPage}></Route>
            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
