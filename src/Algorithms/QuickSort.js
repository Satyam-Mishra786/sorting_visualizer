import { swapWithAnimation } from "../Utils"

async function partition(aux, list, low, high, speed, setList) {

    // pivot
    let pivot = aux[high];
    let barSome = document.getElementById(`bar-${high}`);
    barSome.style.backgroundColor = '#FFBF00';
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (aux[j] < pivot) {
            i++;
            await swapWithAnimation(aux, i, j, speed, setList);
        }
    }
    await swapWithAnimation(aux, i + 1, high, speed, setList);
    let parBar = document.getElementById(`bar-${i + 1}`);
    parBar.style.backgroundColor = 'green';
    return (i + 1);
}


export async function quickSort(aux, list, low, high, speed, setList) {
    if (low < high) {

        // pi is partitioning index, arr[p]
        // is now at right place
        let pi = await partition(aux, list, low, high, speed, setList);
        // partition and after partition
        await quickSort(aux, list, low, pi - 1, speed, setList);
        for (let i = low; i < pi; i++) {
            let barSome = document.getElementById(`bar-${i}`);
            barSome.style.backgroundColor = 'green';
        }

        await quickSort(aux, list, pi + 1, high, speed, setList);
        for (let i = pi + 1; i < high + 1; i++) {
            let barSome = document.getElementById(`bar-${i}`);
            barSome.style.backgroundColor = 'green';
        }
        setList([...aux])

    }
}