import React from "react";

class App extends React.Component {
  state = {
    width: 50,
    height: 30,
    pathWidth: 6,
    pathWall: 2
  };

  createTable = () => {
    let table = [];
    for (let i = 0; i < this.state.height; i++) {
      let row = [];
      for (let j = 0; j < this.state.width; j++) {
        row.push(0);
      }
      table.push(row);
    }
    return this.createMaze(table);
  };

  createMaze = table => {
    let curX = 0;
    let curY = 0;

    let stack = [[curX, curY]];
    let transformTable = [...table];
    transformTable[curX][curY] = 1;

    while (stack.length) {
      let current = stack.pop();
      let direction = Math.floor(Math.random() * 4);

      if (direction == 0) {
        if (
          !(
            curY - 2 < 0 &&
            transformTable[curX][curY - 1] != 1 &&
            transformTable[curX][curY - 2] != 1
          )
        ) {
          curY = curY - 2;
          stack.push([curX, curY]);
          transformTable[curX][curY] = 1;
          transformTable[curX][curY - 1] = 1;
        }
      } else if (direction == 1) {
        if (
          !(
            curY + 2 < 0 &&
            transformTable[curX][curY + 1] != 1 &&
            transformTable[curX][curY + 2] != 1
          )
        ) {
          curY = curY + 2;
          stack.push([curX, curY]);
          transformTable[curX][curY] = 1;
          transformTable[curX][curY + 1] = 1;
        }
      } else if (direction == 2) {
        if (
          !(
            curX - 2 < 0 &&
            transformTable[curX - 1][curY] != 1 &&
            transformTable[curX - 2][curY] != 1
          )
        ) {
          curX = curX - 2;
          stack.push([curX, curY]);
          transformTable[curX][curY] = 1;
          transformTable[curX - 1][curY] = 1;
        }
      } else if (direction == 3) {
        if (
          !(
            curX + 2 < 0 &&
            transformTable[curX + 1][curY] != 1 &&
            transformTable[curX + 2][curY] != 1
          )
        ) {
          curX = curX + 2;
          stack.push([curX, curY]);
          transformTable[curX][curY] = 1;
          transformTable[curX + 1][curY] = 1;
        }
      }
    }

    console.log(transformTable);
    return transformTable;
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    canvas.width = this.state.width * this.state.pathWidth;
    canvas.height = this.state.height * this.state.pathWidth;

    this.createTable();
  }

  render() {
    return <canvas ref="canvas" />;
  }
}

export default App;
