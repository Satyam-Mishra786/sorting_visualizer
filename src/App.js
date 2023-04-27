import Bar from "./Bar";
import "./index.css";
import { useState, useEffect } from "react";
import { isSorted, resetBars } from "./Utils";

import { quickSort } from "./Algorithms/QuickSort";
import { bubbleSort } from "./Algorithms/BubbleSort";
import { selectionSort } from "./Algorithms/SelectionSort";
import { mergeSort } from "./Algorithms/MergeSort";


function App() {
  const [list, setList] = useState([]);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [arr, setArr] = useState(0);
  const [size, setSize] = useState(90);
  const [sortingAlgo, setSortingAlgo] = useState("bubbleSort");

  // Create List with random values
  useEffect(() => {
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function makeRandomList() {
      let listOfRandom = [];
      for (let i = 0; i < size; i++) {
        let j = randomIntFromInterval(50, 600);
        listOfRandom.push(j);
      }
      setList([...listOfRandom])
    }
    makeRandomList();
  }, [arr, size])


  // Remove in deployment
  useEffect(() => {
    console.log(speed, size);
  }, [speed, size])





  function handleClick() {
    var e = document.getElementById("sortingAlgos").value;
    if (e === 'bubble-sort') {
      setSortingAlgo("bubbleSort")
      if (!isSorted(list)) {
        bubbleSort(list, start, setStart, speed, setList);
      } else alert("Data is Already Sorted ")
    }
    else if (e === 'merge-sort') mergeSort(list, setList, start, setStart, speed);
    else if (e === 'selection-sort') selectionSort(list, setList, start, setStart, speed);
    else if (e === 'quick-sort') {
      let aux = list.slice();
      if (!isSorted(list)) {
        quickSort(aux, list, 0, list.length - 1, speed, setList, start, setStart);
      } else {
        alert("Data is Already Sorted ")
      }
    }
  }
  function speedChange() {
    let inputField = Number(document.querySelector(".speedField").value);
    setSpeed(inputField);
  }

  return (
    <div className="windowContainer">
      <div className="infoSection">
        <div className="listSize">
          <span>Bars </span>
          <input type="range" min="25" max={(window.innerWidth) < 480 ? '130' : '250'} defaultValue="90" className="slider" id="myRange" disabled={start} onChange={(e) => setSize(e.target.value)} />
        </div>
        <button className="sortBtn" onClick={handleClick} disabled={start}> Sort </button>
        <button className="sortBtn resetBtn" onClick={() => resetBars(setArr)} disabled={start}> Regenerate Bars </button>
        <div className="speedDiv">
          <label htmlFor="speedInput">Animation Gap</label>
          <input className="speedField" placeholder="Time in ms" id="speedInput" defaultValue="10" onChange={speedChange} disabled={start} />
        </div>
        <select id="sortingAlgos" defaultValue="bubble-sort" onChange={(e) => setSortingAlgo(e.target.value)} disabled={start}>
          <option className="sortingType" value="bubble-sort">Bubble Sort</option>
          <option className="sortingType" value="merge-sort">Merge Sort</option>
          <option className="sortingType" value="selection-sort" >Selection Sort</option>
          <option className="sortingType" value="quick-sort">Quick Sort</option>
        </select>

      </div>
      <div className="Info">
        <div id="redBox">
          <p id="redSpan"></p>
          <span>Currently Swapping</span>
        </div>
        <div id="greenBox">
          <p id="greenSpan"></p>
          <span>Placed At Final Position</span>
        </div>
        {sortingAlgo === 'quick-sort' &&
          <div id="yellowBox">
            <p id="yellowSpan"></p>
            <span>Pivot Element</span>
          </div>
        }

      </div>
      <div className="containerParent">
        <div className="container">
          {list.map((item, index) => (
            <Bar item={item} key={index} idnum={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
