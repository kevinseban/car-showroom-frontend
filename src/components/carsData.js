import cars from './cars.json';

export function getCarById(id) {
  return cars.find((car) => car.carId === id);
}

