import {BOMBS, HEIGHT, PLATES, WIDTH} from "../constants";

export const createBombs = (clickedIndex) => {
  const shuffled = PLATES
    .filter((position) => position !== clickedIndex)
    .sort(() => Math.random() - 0.5);
  return shuffled.slice(0, BOMBS);
};

export const createPlates = () => {
  let data = [];

  for (let i = 0; i < HEIGHT; i++) {
    data.push([]);
    for (let j = 0; j < WIDTH; j++) {
      data[i][j] = {
        x: i,
        y: j,
        neighbour: 0,
        opened: false,
      };
    }
  }
  return data;
};

export const getNeighbours = (data, bombsPosition) => {
  const checkBomb = (index) => bombsPosition.includes(index);
  let updatedData = data;

  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const index = i * WIDTH + j;
      if (!checkBomb(index)) {
        let mine = 0;
        const area = traverseBoard(data[i][j].x, data[i][j].y, data);
        area.forEach((value) => {
          const index = value.x * WIDTH + value.y;
          if (checkBomb(index)) {
            mine++;
          }
        });
        updatedData[i][j].neighbour = mine;
      }
    }
  }

  return updatedData;
};

export const traverseBoard = (x, y, data) => {
  const neighbors = [];

  if (x > 0) {
    neighbors.push(data[x - 1][y]);
  }

  if (x < HEIGHT - 1) {
    neighbors.push(data[x + 1][y]);
  }

  if (y > 0) {
    neighbors.push(data[x][y - 1]);
  }

  if (y < WIDTH - 1) {
    neighbors.push(data[x][y + 1]);
  }

  if (x > 0 && y > 0) {
    neighbors.push(data[x - 1][y - 1]);
  }

  if (x > 0 && y < WIDTH - 1) {
    neighbors.push(data[x - 1][y + 1]);
  }

  if (x < HEIGHT - 1 && y < WIDTH - 1) {
    neighbors.push(data[x + 1][y + 1]);
  }

  if (x < HEIGHT - 1 && y > 0) {
    neighbors.push(data[x + 1][y - 1]);
  }

  return neighbors;
};

export const openEmptyNeighbors = (item, neighbors, bombsPositions) => {
  const checkBomb = (index) => bombsPositions.includes(index);
  const itemIndex = item.x * WIDTH + item.y;

  let area = traverseBoard(item.x, item.y, neighbors);
  area.forEach(value => {
    const index = value.x * WIDTH + value.y;
    const isEmpty = value.neighbour === 0;
    const isNotBomb = checkBomb(index);
    // debugger
    if (!isEmpty) {
      neighbors[value.x][value.y].opened = true;
      return;
    }
    if (!value.opened && (isEmpty || !isNotBomb)) {
      neighbors[value.x][value.y].opened = true;
      if (isEmpty) {
        openEmptyNeighbors(value, neighbors, bombsPositions);
      }
    }
  });
  return neighbors;
};
