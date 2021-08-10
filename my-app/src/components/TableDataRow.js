import { useEffect, useState } from "react";
import { deleteItemById, isNumeric, findItemInArr } from "../utils/utils";

const TableDataRow = ({ data, setCart, cart }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (findItemInArr(+data.gid, cart) !== -1) {
      setValue(cart[findItemInArr(+data.gid, cart)].amount);
    } else {
      setValue(0);
    }
  }, [cart, data.gid]);
  return (
    <tr>
      <td>{data.gid}</td>
      <td>{data.gname}</td>
      <td>{+data.gprice}</td>
      <td style={{ display: "flex" }}>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);

            if (event.target.value === "") {
              setCart([...deleteItemById(+data.gid, cart)]);
            }

            if (isNumeric(event.target.value)) {
              setCart([
                ...deleteItemById(+data.gid, cart),
                {
                  id: +data.gid,
                  price: +data.gprice,
                  amount: +event.target.value,
                },
              ]);
            } else {
              setCart([...deleteItemById(+data.gid, cart)]);
            }
          }}
          style={{ margin: "0px auto", width: "70%" }}
        />
      </td>
      <td>
        {isNaN(value * data.gprice) ? "Некорректный ввод" : value * data.gprice}
      </td>
    </tr>
  );
};

export default TableDataRow;
