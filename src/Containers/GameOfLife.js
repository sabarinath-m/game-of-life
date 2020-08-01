//findNeighborCount returns the total number of alive neighbors

function findNeighborCount(irow, icolumn, initial, rowBound, columnBound) {
  // irow and icolumn will provide the postion of a particular element
  // size of 2-D list is given by rowBound,columnBound
  let row = Number(irow);
  let column = Number(icolumn);
  let count = 0;
  if (row - 1 >= 0) {
    if (initial[row - 1][column] === true) count++;
  }
  if (row - 1 >= 0 && column - 1 >= 0) {
    if (initial[row - 1][column - 1] === true) count++;
  }
  if (row - 1 >= 0 && column + 1 < columnBound) {
    if (initial[row - 1][column + 1] === true) count++;
  }
  if (column - 1 >= 0) {
    if (initial[row][column - 1] === true) count++;
  }
  if (column + 1 < columnBound) {
    if (initial[row][column + 1] === true) count++;
  }
  if (row + 1 < rowBound && column - 1 >= 0) {
    if (initial[row + 1][column - 1] === true) count++;
  }
  if (row + 1 < rowBound && column + 1 < columnBound) {
    if (initial[row + 1][column + 1] === true) count++;
  }
  if (row + 1 < rowBound) {
    if (initial[row + 1][column] === true) count++;
  }
  return count;
}

//nextGenCreation returns nextgeneration 2-D list that is our output

function nextGenCreation(nextGen, grid, rowValue, columnValue) {
  for (let row in grid) {
    for (let column in grid[row]) {
      let initialElement = grid[row][column];
      let neighborCount = findNeighborCount(
        row,
        column,
        grid,
        rowValue,
        columnValue
      );
      if (initialElement === true) {
        if (neighborCount < 2 || neighborCount > 3) {
          nextGen[row][column] = false; //becomes dead cell
        } else if (neighborCount === 2 || neighborCount === 3) {
          nextGen[row][column] = true; //live cell
        }
      } else if (initialElement === false) {
        if (neighborCount === 3) {
          nextGen[row][column] = true; //becomes alive cell
        }
      }
    }
  }
  return nextGen;
}

//processInput stops receving input on user click ctrl-D
//transform received input to a 2-D list having 'x' and '-' as elements
//call nextGenCreation and console the nextGeneration as output

function GameOfLife(rowValue, columnValue, grid) {
  let nextGen = [];
  for (let row = 0; row < grid.length; row++) {
    nextGen.push([]);
    for (let column = 0; column < grid[0].length; column++) {
      nextGen[row].push(false);
    }
  }
  return nextGenCreation(nextGen, grid, rowValue, columnValue);
}

export default GameOfLife;
