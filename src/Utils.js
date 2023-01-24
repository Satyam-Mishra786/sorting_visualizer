export async function swapWithAnimation(arr, i, j, speed, setList) {
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

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function isSorted(list) {
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] > list[i + 1]) return false;
    }
    return true;
}

export function resetBars(setArr) {
    let bar = document.querySelectorAll(".bar");
    bar.forEach(bars => {
        bars.style.backgroundColor = "rgb(7 157 206)";
    })
    setArr((prevArr) => prevArr + 1);
}

