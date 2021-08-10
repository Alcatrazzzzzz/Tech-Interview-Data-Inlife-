import TableDataRow from "./TableDataRow";
const TablePage = ({ state, cart, setCart, activeHeading }) => {
  let content = [];

  state.data.forEach((element) => {
    if (activeHeading === "Все" || activeHeading === element.rname) {
      let subContent = [];

      element.goods.forEach((element) => {
        subContent.push(
          <TableDataRow
            key={element.rid}
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
    <table>
      <tbody>{content}</tbody>
    </table>
  );
};

export default TablePage;
