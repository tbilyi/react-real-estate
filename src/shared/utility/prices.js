export const rentIncome = (flat) => {
    return Math.floor(flat.square * ( flat.condition * 2) * 2);
}

export const GetPriceWithSpaces = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}