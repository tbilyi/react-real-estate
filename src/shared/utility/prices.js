export const rentIncome = (flat) => {
    return Math.floor(flat.square * ( flat.condition * 2) * 2);
}

export const getIncome = (flats) => {
    let income = 0;
    for( let i=0; i<flats.length; i++ ){
        if(flats[i].rented){
            income += rentIncome(flats[i])
        }
    }
    return income
}

export const GetPriceWithSpaces = (price) => {
    return price.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}