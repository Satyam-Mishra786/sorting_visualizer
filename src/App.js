import Bar from "./Bar";
import "./index.css";
import { useState, useEffect } from "react";
import { quickSort } from "./Algorithms/QuickSort";
import { isSorted, resetBars } from "./Utils";
import { bubbleSort } from "./Algorithms/BubbleSort";
function App() {
  const [list, setList] = useState([]);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [arr, setArr] = useState(0);
  const [size, setSize] = useState(150);
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
    if (e === 'bubble-sort') bubbleSort(list, start, setStart, speed, setList);
    else if (e === 'merge-sort') mergeSort();
    else if (e === 'selection-sort') selectionSort();
    else if (e === 'quick-sort') {
      setSortingAlgo("quickSort");
      let aux = list.slice();
      if (!isSorted(list)) {
        quickSort(aux, list, 0, list.length - 1, speed, setList);
      } else {
        alert("Data is Already Sorted ")
      }
    }
  }



  async function mergeSort() {

  }


  function selectionSort() {

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
          <input type="range" min="25" max="250" defaultValue="150" className="slider" id="myRange" disabled={start} onChange={(e) => setSize(e.target.value)} />
        </div>
        <button className="sortBtn" onClick={handleClick} disabled={start}> Sort </button>
        <button className="sortBtn resetBtn" onClick={() => resetBars(setArr)} disabled={start}> Regenerate Bars </button>
        <div className="speedDiv">
          <label htmlFor="speedInput">Animation Gap</label>
          <input className="speedField" placeholder="Time in ms" id="speedInput" defaultValue="10" onChange={speedChange} disabled={start} />
        </div>
        <select id="sortingAlgos" defaultValue="bubble-sort" disabled={start}>
          <option className="sortingType" value="bubble-sort">Bubble Sort</option>
          <option className="sortingType" value="merge-sort" disabled={true}>Merge Sort</option>
          <option className="sortingType" value="selection-sort" disabled={true}>Selection Sort</option>
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
        {sortingAlgo === 'quickSort' &&
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
