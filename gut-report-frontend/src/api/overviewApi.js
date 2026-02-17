import data from "../mocks/overview.json";

export const getOverview = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 700);
  });
};
