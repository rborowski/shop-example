updateItem(productId, newQuantity) {
  for (let i = 0; i < this.items.length; i++) {
    const item = this.items[i];
    if (item.product.id === productId && newQuantity > 0) {
      const cartItem = { ...item };
      const quantityChange = newQuantity - item.quantity;
      cartItem.quantity = newQuantity;
      cartItem.totalPrice = newQuantity * item.product.price;
      this.items[i] = cartItem;

      this.totalQuantity = this.totalQuantity + quantityChange;
      this.totalPrice += quantityChange * item.product.price;
      return { updatedItemPrice: cartItem.totalPrice };
    } else if (item.product.id === productId && newQuantity <= 0) {
      this.items.splice(i, 1);
      this.totalQuantity = this.totalQuantity - item.quantity;
      this.totalPrice -= item.totalPrice;
      return { updatedItemPrice: 0 };
    }
  }
}