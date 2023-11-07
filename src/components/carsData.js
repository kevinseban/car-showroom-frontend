import cars from './cars.json';

export function getCarById(id) {
  return cars.find((car) => car.carId === id);
}

export function getColorById(carId, colorId) {
  const car = cars.find((car) => car.carId === carId);

  if (!car || !car.colors) {
    return null;
  }

  return car.colors.find((color) => color.colorId === colorId);
}
