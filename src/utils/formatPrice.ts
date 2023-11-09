export const priceFormat = (price: string | number | null) => {
  if (price) {
    return 0;
  }

  return Number(price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
