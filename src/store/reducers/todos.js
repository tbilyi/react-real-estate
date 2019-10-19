const initialState = {
  neighbourhood: (condition) => {
    switch (condition) {
      case 1: return 'slums';
      case 2: return 'blocks of flats';
      case 3: return 'elite flats';
      case 4: return 'detached houses';
      case 5: return 'mansions';
      default: return '';
    }
  },
  apartmentCondition: (district) => {
    switch (district) {
      case 1: return 'Need renovation';
      case 2: return 'Need furniture';
      case 3: return 'good';
      case 4: return 'luxurious';
      case 5: return 'splendid';
      default: return '';
    }
  },
  metersToFeet: (m) => Math.floor(m * 10.764),
};

const todos = (state = initialState) => state;

export default todos;
