// import { type Product, db } from ".";
// import * as dotenv from "dotenv";

// dotenv.config();

// const getRandomPrice = () => {
//   const PRICES = [9.99, 19.99, 29.99, 39.99, 49.99];
//   return PRICES[Math.floor(Math.random() * PRICES.length)];
// };

// const COLORS = ["white", "black", "red", "blue"] as const;
// const TYPE = ["suv", "sedan", "coupe"] as const;
// const STATE = ["all", "new", "used"] as const;

// const seed = async () => {
//   const products: Product[] = [];

//   // 3 example products
//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < COLORS.length; j++) {
//       for (let k = 0; k < TYPE.length; k++) {
//         for (let l = 0; l < STATE.length; l++) {
//           const type = TYPE[k];
//           const color = COLORS[j];
//           const state = STATE[l];
//           products.push({
//             id: `${color}-${type}-${i + 1}`,
//             imageId: `/${color}_${i + 1}.png`,
//             color,
//             name: `${
//               color.slice(0, 1).toUpperCase() + color.slice(1)
//             } shirt ${i}`,
//             type,
//             price: getRandomPrice(),
//             brand: "",
//             model: 0,
//             description: "",
//             state: state,
//           });
//         }
//       }
//     }
//   }
//   const TYPE_MAP = {
//     suv: 0,
//     sedan: 1,
//     coupe: 2,
//   };

//   const COLOR_MAP = {
//     white: 0,
//     black: 1,
//     red: 2,
//     blue: 3,
//   };

//   await db.upsert(
//     products.map((product) => ({
//       id: product.id,
//       vector: [COLOR_MAP[product.color], TYPE_MAP[product.type], product.price],
//       metadata: product,
//     }))
//   );
// };

// seed();

import { type Product, db } from ".";
import * as dotenv from "dotenv";

dotenv.config();

const getRandomPrice = () => {
  const PRICES = [19999, 29999, 39999, 49999, 59999];
  return PRICES[Math.floor(Math.random() * PRICES.length)];
};

const COLORS = ["white", "black", "red", "blue"] as const;
const STATES = ["new", "used"] as const;
const BRANDS = ["Toyota", "Honda", "Ford"] as const;
const MODELS = [2022, 2023, 2024] as const;
const TYPES = ["suv", "sedan", "coupe"] as const;

const seed = async () => {
  const products: Product[] = [];

  // Create example products
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < COLORS.length; j++) {
      for (let k = 0; k < STATES.length; k++) {
        const color = COLORS[j];
        const state = STATES[k];
        const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
        const model = MODELS[Math.floor(Math.random() * MODELS.length)];
        const type = TYPES[Math.floor(Math.random() * TYPES.length)];

        products.push({
          id: `${color}-${type}-${state}-${i + 1}`,
          imageId: `/images/${color}_${i + 1}.png`,
          color,
          name: `${brand} ${type} ${i + 1}`,
          state,
          brand,
          model,
          type,
          price: getRandomPrice(),
          description: `${brand} ${model} ${type} in ${color} color, state: ${state}.`,
        });
      }
    }
  }

  const COLOR_MAP = {
    white: 0,
    black: 1,
    red: 2,
    blue: 3,
  };

  const STATE_MAP = {
    new: 0,
    used: 1,
  };

  await db.upsert(
    products.map((product) => ({
      id: product.id,
      vector: [
        COLOR_MAP[product.color],
        STATE_MAP[product.state],
        product.price,
      ],
      metadata: product,
    }))
  );
};

seed();
