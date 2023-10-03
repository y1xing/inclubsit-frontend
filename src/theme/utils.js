import { blue, green, indigo, purple, red } from './colors';

export const getPrimary = (preset) => {
  switch (preset) {
    case 'blue':
      return blue;
    case 'green':
      return green;
    case 'indigo':
      return indigo;
    case 'purple':
      return purple;
    case 'red':
      return red;
    default:
      console.error(
        'Invalid color preset, accepted values: "blue", "green", "indigo" or "purple"".'
      );
      return red;
  }
};
