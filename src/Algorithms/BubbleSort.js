import { swapWithAnimation } from "../Utils";
export async function bubbleSort(list, start, setStart, speed, setList) {
    let aux = list.slice();
    setStart(!start);
    let i = 0;
    let track = aux.length - 1;
    for (; i < aux.length; i++) {
        for (let j = 0; j < (aux.length - 1); j++) {

            if (aux[j] > aux[j + 1]) {
                await swapWithAnimation(aux, j, j + 1, speed, setList);
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