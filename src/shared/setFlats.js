import {streets} from "../assets/allstreets";

export class GenFlats {
  static #getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  static #getRandomPriceInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return (Math.floor(Math.random() * (max - min)) + min) * 1000;
  };

  static #genStreet = (district) => {
    const house = this.#getRandomInt(1111,9999);
    const street = streets[Math.floor(Math.random()*streets.length)];
    let apartment = '';
    if (district < 4) {
      apartment = 'APT '+'ABCDEFGH'[Math.floor(Math.random()*8)] + this.#getRandomInt(1, 20);
    }
    return `${house} ${street} ${apartment}`;
  };

  static #genflat = (i) => {
    const district = this.#getRandomInt(1, 5);
    let square = this.#getRandomInt(15, 50) + (Math.pow(district, 3) * 3),
      condition = 1,
      basicPrice = this.#getRandomPriceInt(0.5, 2);
    switch (district) {
      case 1: condition = this.#getRandomInt(1, 2); break;
      case 2: condition = this.#getRandomInt(1, 3); break;
      case 3: condition = this.#getRandomInt(2, 4); break;
      case 4: condition = this.#getRandomInt(3, 4); break;
      case 5:
        condition = 5;
        square *= 5;
        basicPrice *= 2;
      break;
      default : break;
    }
    return {
      id: i + this.#getRandomInt(1, 100000),
      price: basicPrice * district * condition * square/4,
      square,
      condition,
      district,
      img: `c${condition}.jpg`,
      strImg: `s${district}.jpg`,
      location: this.#genStreet(district),
      rented: false,
    };
  };

  static setNewFlats = () => {
    let genNewFlats = [];
    for (let i = 0; i < 10; i += 1) {
      genNewFlats.push(this.#genflat(i));
    }
    return genNewFlats;
  };
}
