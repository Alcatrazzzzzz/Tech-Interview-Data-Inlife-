import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import TablePage from "./components/TablePage";
function App() {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const [activeHeading, setActiveHeading] = useState("Все");
  const [cart, setCart] = useState([]);

  if (state.data === null) {
    axios
      .get("https://datainlife.ru/junior_task/get_products.php")
      .then((response) => {
        setState({
          ...state,
          loading: false,
          data: response.data,
        });
      })
      .catch(() => {
        setState({
          ...state,
          loading: false,
          error: true,
        });
      });
  }

  if (state.loading) {
    return <div>Loading ...</div>;
  }

  if (state.error) {
    return <div>Something went wrong</div>;
  }
  if (state.data) {
    let listContent = [];
    let routes = [];

    let finalPrice = 0;
    let finalAmount = 0;

    if (cart) {
      cart.forEach((cartItem) => {
        finalPrice += +cartItem.price * cartItem.amount;
        finalAmount += cartItem.amount;
      });
    }

    listContent.push(
      <li
        onClick={() => {
          setActiveHeading("Все");
        }}
      >
        <Link to="/">
          {activeHeading === "Все" ? (
            <span style={{ fontWeight: "bold" }}>Все</span>
          ) : (
            "Все"
          )}
        </Link>
      </li>
    );
    state.data.forEach((element) => {
      routes.push(
        <Route path={`/${element.urlalias}`}>
          <TablePage
            activeHeading={activeHeading}
            state={state}
            cart={cart}
            setCart={(elem) => setCart(elem)}
          />
        </Route>
      );

      listContent.push(
        <li
          onClick={() => {
            setActiveHeading(element.rname);
          }}
        >
          <Link to={`/${element.urlalias}`}>
            {activeHeading === element.rname ? (
              <span style={{ fontWeight: "bold" }}>{element.rname}</span>
            ) : (
              element.rname
            )}
          </Link>
        </li>
      );
    });

    return (
      <Router>
        <h1 className="main-heading">Tech Interview for Data InLife</h1>
        <div className="table-container">
          <div className="heading-list">
            <ul>{listContent}</ul>
          </div>
          <Switch>
            <Route exact path="/">
              <TablePage
                activeHeading={activeHeading}
                state={state}
                cart={cart}
                setCart={(elem) => setCart(elem)}
              />
            </Route>
            {routes}
          </Switch>
        </div>
        <div className="cart-bar">
          <div className="cart-content">
            <p>Итоговая сумма: {finalPrice}</p>
            <p style={{ margin: "auto" }}>Количество товаров: {finalAmount}</p>
            <button
              className="cart-addtobtn"
              onClick={() => {
                let product = new FormData();
                cart.forEach((cartItem) => {
                  product.append(cartItem.id, cartItem.amount);
                });

                axios.post(
                  "https://datainlife.ru/junior_task/add_basket.php",
                  product
                );
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
