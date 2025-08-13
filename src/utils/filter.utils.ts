// import { EOrderDirection } from "../backend/casaikos-api";

// export const sortHandler = (
//   key: string,
//   sortBy: string,
//   setSortBy: (value: string) => void,
//   setSortDirection:
//     | ((value: EOrderDirection) => void)
//     | ((updater: (prev: EOrderDirection) => EOrderDirection) => void)
// ) => {
//   if (sortBy === key) {
//     (
//       setSortDirection as (
//         updater: (prev: EOrderDirection) => EOrderDirection
//       ) => void
//     )((prev: EOrderDirection) =>
//       prev === EOrderDirection.Asc ? EOrderDirection.Desc : EOrderDirection.Asc
//     );
//   } else {
//     (setSortDirection as (value: EOrderDirection) => void)(EOrderDirection.Asc);
//     setSortBy(key);
//   }
// };

// // from chiheb: this is used to get the sort icon value based on the current sort state
// export const getSortIconValue = (
//   key: string,
//   sortBy: string,
//   orderBy: EOrderDirection
// ) => {
//   if (sortBy === key) {
//     return orderBy === EOrderDirection.Asc ? "+" : "-";
//   }
//   return "";
// };

export const commaSeparatedToArray = (input: string | null): string[] => {
  if (!input) return [];
  return input
    .split(",")
    .map((city) => city.trim())
    .filter((city) => city !== "");
};
