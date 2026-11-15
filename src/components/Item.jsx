function Item({ item, onUpdateItem }) {

  function handleAddToCartClick() {

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          console.log("Failed to update Item")
        }
      })
      .then(updatedItem => onUpdateItem(updatedItem))
      .catch(error => console.log(error))

    console.log("clicked item:", item);
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove">Delete</button>
    </li>
  );
}

export default Item;
