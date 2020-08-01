import React, { useState, useEffect, useCallback,useRef } from "react";
import "./MainPage.css";
import Input from "../Components/Input/Input";
import GridCreator from "../Components/GridCreator/GridCreator";
import GameOfLife from "./GameOfLife";

const MainPage = () => {
  const [rowValue, setrowValue] = useState(3);
  const [columnValue, setcolumnValue] = useState(3);
  const [evolutionTime, setEvolutionTime] = useState(false);
  //All grid element's status is stored in a 2-D list(GridList)
  //eg:tempGrid[2][3] = false -> element at [2][3] is not active

  const createGridList = () => {
    var tempGrid = new Array(Number(columnValue));
    for (var i = 0; i < Number(columnValue); i++) {
      tempGrid[i] = new Array(Number(rowValue));
      for (let j = 0; j < Number(rowValue); j++) {
        tempGrid[i][j] = false;
      }
    }
    return tempGrid;
  };
  
  const [GridList, setGridList] = useState(createGridList());
  const [ActiveGridIndexList, setGridIndexList] = useState([""]);

  const addToActiveGridIndexList = (row, column) => {
    let indexValue = `${row},${column}`;
    let tempActiveList = [...ActiveGridIndexList];
    if (tempActiveList.indexOf(indexValue) === -1) {
      console.log('add')
      tempActiveList.push(indexValue);
      console.log(tempActiveList)
      setGridIndexList([...tempActiveList])
      console.log(ActiveGridIndexList)
    }
  };
  const removeFromActiveGridIndexList = (row, column) => {
    let indexValue = `${row},${column}`;
    let tempActiveList = [...ActiveGridIndexList];
    let tempList = tempActiveList.filter((value) => value !== indexValue);
    setGridIndexList([...tempList]);
  };
  const checkActiveGridList = (row, column) => {
    let indexValue = `${row},${column}`;
    const tempActiveList = [...ActiveGridIndexList];
    if (tempActiveList.indexOf(indexValue) !== -1) {
      return true;
    }
    return false;
  };
  const updateActiveGridList = () => {
    for (let row = 0; row < rowValue; row+=1) {
      for (let column = 0; column < columnValue; column+=1) {
        if (GridList[row][column] === true) {
          console.log(true)
          addToActiveGridIndexList(row, column);
        } else {
          removeFromActiveGridIndexList(row, column);
        }
      }
    }
  };
 
  useEffect(() => {
    const updatedGridList = Array.from({ length: rowValue }, () =>
      Array.from({ length: columnValue }, () => false)
    );

    for (let i = 0; i < rowValue; i += 1) {
      for (let j = 0; j < columnValue; j += 1) {
        try {
          if (checkActiveGridList(i, j)) {
            updatedGridList[i][j] = true;
          }
        } catch (err) {}
      }
    }
    setGridList(updatedGridList);
  }, [rowValue, columnValue,evolutionTime]);

  let updateActiveGridListforuseEffect=(grid)=>{
    let temp = []
    for(let i=0;i<rowValue;i++){
      for(let j=0;j<columnValue;j++){
        if(grid[i][j]){
          temp.push(`${i},${j}`);
          setGridIndexList([...temp])
        }
      }
    }
  }
  const newPopulation = useCallback(() => {
    const future = GameOfLife(rowValue, columnValue, [...GridList]);
    setGridList([...future]);
    return future
  }, [GridList]);

  useEffect(() => {
    let interval;
    if (evolutionTime) {
      interval = setInterval(() => {
        let future=newPopulation();
        updateActiveGridListforuseEffect(future)
      }, 1000);
    } else {
      updateActiveGridList();
    }
    return () => clearInterval(interval);
  }, [evolutionTime, newPopulation]);

  const inputXChangedHandler = (event) => {
    updateActiveGridList()
    setrowValue(event.target.value);
  };

  const inputYChangedHandler = (event) => {
    updateActiveGridList()
    setcolumnValue(event.target.value);
  };

  // twoDindex is a string represents index of a grid element
  //eg: "20,30" => [20][30]'th grid element
  const toogleElementHandler = (twoDindex) => {
    let [yIndex, xIndex] = twoDindex.split(",");
    yIndex = +yIndex; //converting to number
    xIndex = +xIndex;
    let tempeGrid = [...GridList];
    tempeGrid[yIndex][xIndex] = !tempeGrid[yIndex][xIndex];
    setGridList([...tempeGrid]);
    if (tempeGrid[yIndex][xIndex]) {
      addToActiveGridIndexList(yIndex, xIndex);
    } else {
      removeFromActiveGridIndexList(yIndex, xIndex);
    }
  };

  let displayGrid = null;
  if (GridList) {
    displayGrid = (
      <GridCreator
        className="grid"
        GridList={GridList}
        toogleElement={toogleElementHandler}
      />
    );
  }

  return (
    <div>
      <div className="header">
        <h1>GAME OF LIFE</h1>
      </div>
      <div className="mainpage">
        <label>Enter row Value : </label>
        <Input
          disable={evolutionTime}
          value={rowValue}
          changed={(event) => inputXChangedHandler(event)}
        />
        <label>Enter column Value : </label>
        <Input
          disable={evolutionTime}
          value={columnValue}
          changed={(event) => inputYChangedHandler(event)}
        />

        <button
          className="button"
          onClick={() => {
            setEvolutionTime(
              (prevState) => !prevState)}}
        >
          {evolutionTime ? "PAUSE" : "START"}
        </button>
      </div>
      <hr />

      {displayGrid}
    </div>
  );
};

export default MainPage;
