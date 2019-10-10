const genFlats = () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const getRandomPriceInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        return (Math.floor(Math.random() * (max - min)) + min) * 1000;
    };

    const genflat = (i) => {
        let condition = getRandomInt(1, 3),
            price = getRandomPriceInt(15, 150);
        let flat = {
            id: i + getRandomInt(1, 100000),
            price: (price * condition) / 2,
            square: price / 1000 + 15,
            condition: condition,
            img: 'flat1/con' + condition + '_pic1.jpg',
            location: "District " + getRandomInt(1, 20),
            rented: false
        }
        return flat;
    };

    const setNewFlats = () => {
        let genNewFlats = [];
        for (let i = 0; i < 10; i++) {
            genNewFlats.push(genflat(i));
        }
        return genNewFlats;
    }

    return setNewFlats();
}
export default genFlats;