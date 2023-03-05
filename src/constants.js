import lodash from "lodash";

export const WIDTH = 16;
export const HEIGHT  = 16;
export const FIELD_SIZE = WIDTH * HEIGHT;
export const BOMBS = 40;
export const PLATES = lodash.range(FIELD_SIZE);
