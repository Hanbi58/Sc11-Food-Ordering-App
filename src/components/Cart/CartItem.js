import classes from "./CartItem.module.css";
// import { useRef } from "react";
// import CartContext from "../../store/cart-context";
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  // const item = props.item;
  const onAddHandler = () => {
    props.onAdd(props.item);
  };
  const onSubHandler = () => {
    props.onRemove(props.item.id);
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onSubHandler}>−</button>

        <button onClick={onAddHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
