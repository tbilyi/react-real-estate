export const rentIncome = (flat) => Math.floor(flat.square * (flat.condition * 2) * 2);

export const getIncome = (flats) => {
  let income = 0;
  for (let i = 0; i < flats.length; i += 1) {
    if (flats[i].rented) {
      income += rentIncome(flats[i]);
    }
  }
  return income;
};

export const GetPriceWithSpaces = (price) => price.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
