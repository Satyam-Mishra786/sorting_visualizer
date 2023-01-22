import Bar from "./Bar";
import "./index.css";
import { useState, useEffect } from "react";
function App() {
  const [list, setList] = useState([]);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [arr, setArr] = useState(0);
  const [size, setSize] = useState(150);

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


  useEffect(() => {
    console.log(speed, size);
  }, [speed, size])


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function resetBars() {
    let bar = document.querySelectorAll(".bar");
    bar.forEach(bars => {
      bars.style.backgroundColor = "rgb(7 157 206)";
    })
    setArr((prevArr) => prevArr + 1);
  }


  function handleClick() {
    var e = document.getElementById("sortingAlgos").value;
    if (e === 'bubble-sort') bubbleSort();
    else if (e === 'merge-sort') mergeSort();
    else if (e === 'selection-sort') selectionSort();
    else if (e === 'quick-sort') {
      let aux = list.slice();
      quickSort(aux, list, 0, list.length - 1);
    }
  }

  async function bubbleSort() {
    let aux = list.slice();
    setStart(!start);
    let i = 0;
    let track = aux.length - 1;
    for (; i < aux.length; i++) {
      for (let j = 0; j < (aux.length - 1); j++) {

        if (aux[j] > aux[j + 1]) {
          await swapWithAnimation(aux, j, j + 1);
        }
        if (j + 1 === track || track === 0) {
          let first = document.getElementById(`bar-${track}`);
          first.style.backgroundColor = "green";
          --track;
        }
      }
    }
    setStart((prevStart) => !prevStart);
  }

  async function mergeSort() {

  }


  function selectionSort() {

  }

  async function swapWithAnimation(arr, i, j) {
    document.getElementById(`bar-${i}`).style.backgroundColor = 'red';
    document.getElementById(`bar-${j}`).style.backgroundColor = 'red';
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    await sleep(speed);
    setList([...arr])

    document.getElementById(`bar-${i}`).style.backgroundColor = 'rgb(7 157 206)';
    document.getElementById(`bar-${j}`).style.backgroundColor = 'rgb(7 157 206)';

  }


  async function partition(aux, list, low, high) {

    // pivot
    let pivot = aux[high];
    let barSome = document.getElementById(`bar-${high}`);
    barSome.style.backgroundColor = 'cyan';
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      if (aux[j] < pivot) {
        i++;
        await swapWithAnimation(aux, i, j);
      }
    }
    await swapWithAnimation(aux, i + 1, high);
    let parBar = document.getElementById(`bar-${i + 1}`);
    parBar.style.backgroundColor = 'green';
    return (i + 1);
  }


  async function quickSort(aux, list, low, high) {
    if (low < high) {

      // pi is partitioning index, arr[p]
      // is now at right place
      let pi = await partition(aux, list, low, high);
      // partition and after partition
      await quickSort(aux, list, low, pi - 1);
      for (let i = low; i < pi; i++) {
        let barSome = document.getElementById(`bar-${i}`);
        barSome.style.backgroundColor = 'green';
      }

      await quickSort(aux, list, pi + 1, high);
      setList([...aux])

    }
  }

  function speedChange() {
    let inputField = Number(document.querySelector(".speedField").value);
    setSpeed(inputField);
  }

  return (
    <div className="windowContainer">
      <div className="infoSection">
        <input type="range" min="25" max="250" defaultValue="150" className="slider" id="myRange" disabled={start} onChange={(e) => setSize(e.target.value)} />
        <button className="sortBtn" onClick={handleClick} disabled={start}> Sort </button>
        <button className="sortBtn resetBtn" onClick={resetBars} disabled={start}> Regenerate Bars </button>
        <div className="speedDiv">
          <label htmlFor="speedInput">Speed</label>
          <input className="speedField" id="speedInput" defaultValue="10" onChange={speedChange} disabled={start} />
        </div>
        <select id="sortingAlgos" defaultValue="bubble-sort" disabled={start}>
          <option className="sortingType" value="bubble-sort">Bubble Sort</option>
          <option className="sortingType" value="merge-sort" disabled={true}>Merge Sort</option>
          <option className="sortingType" value="selection-sort" disabled={true}>Selection Sort</option>
          <option className="sortingType" value="quick-sort">Quick Sort</option>
        </select>

      </div>
      <div className="Info">{start && "Sorting..."}</div>
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
