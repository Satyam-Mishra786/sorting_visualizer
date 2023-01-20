import Bar from "./Bar";
import "./index.css";
import { useState,useEffect } from "react";
function App() {
  const [list, setList] = useState([]);

  useEffect(() => {  
    function randomIntFromInterval(min, max) { 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function makeRandomList(){
      let listOfRandom = [];
      for(let i = 0; i<150; i++){
        let j = randomIntFromInterval(1,100);
        listOfRandom.push(j);
      }
      setList([...listOfRandom])
    }  
    makeRandomList();
  }, [])




  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleClick(){
    console.log(list.length);
    // Bubble Sort
    var i = 0;
    for(; i < list.length; i++){
        for(var j = 0; j < ( list.length - i -1 ); j++){
          if(list[j] > list[j+1]){
            var temp = list[j]
            list[j] = list[j + 1]
            list[j+1] = temp;
           let first = document.getElementById(`bar-${j}`);
           let second =  document.getElementById(`bar-${j+1}`);
           if(first !== null){
             first.style.backgroundColor = "green";
             second.style.backgroundColor = "green";
            }

            await sleep(10);

            if(first !== null){
              first.style.backgroundColor = "DodgerBlue";
              second.style.backgroundColor = "DodgerBlue";
            }

            setList([...list])
          }
        }
    }
  }

  return (
    <>
    <button className="sortBtn"  onClick={handleClick}> Sort </button>
      <div className="containerParent">
        <div className="container">
        {list.map((item,index) =>(
          <Bar item={item} key={index} idnum={index+1}/>
        ))}
        </div>
      </div>
    </>
  );
}

export default App;
