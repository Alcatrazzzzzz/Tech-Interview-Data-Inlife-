import axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import TableDataRow from "./TableDataRow";

const ContentPage = ({ heading, state }) => {
  const [activeHeading, setActiveHeading] = useState(heading);
  const [cart, setCart] = useState([]);

  if (state.loading) {
    return <div>Loading ...</div>;
  }

  if (state.error) {
    return <div>Something went wrong</div>;
  }

  if (state.data) {
    let content = [];
    let listContent = [];

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
      listContent.push(
        <li
          onClick={() => {
            setActiveHeading(element.rname);
          }}
        >
          <Link to={`/${element.urlalias}`} onClick={() => {}}>
            {activeHeading === element.rname ? (
              <span style={{ fontWeight: "bold" }}>{element.rname}</span>
            ) : (
              element.rname
            )}
          </Link>
        </li>
      );

      if (heading === "Все") {
        let subContent = [];

        element.goods.forEach((element) => {
          subContent.push(
            <TableDataRow
              setCart={(element) => setCart(element)}
              cart={cart}
              data={element}
            />
          );
        });

        content.push(
          <>
            <tr>
              <td className="section-heading" colSpan={5}>
                <h1>{element.rname}</h1>
              </td>
            </tr>
            <tr className="headings-row">
              <td>Id</td>
              <td>Название товара</td>
              <td>Цена</td>
              <td>Количество</td>
              <td>Сумма</td>
            </tr>
            {subContent}
          </>
        );
      }
    });
    return (
      <Router>
        <h1 className="main-heading">Tech Interview for Data InLife</h1>
        <div className="table-container">
          <div className="heading-list">
            <ul>{listContent}</ul>
          </div>
          <table>
            <tbody>{content}</tbody>
          </table>
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
                // .then(() => {
                //   setCart([]);
                // });
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </Router>
    );
  }
};

export default ContentPage;
