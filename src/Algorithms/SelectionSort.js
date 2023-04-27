import { swapWithAnimation } from "../Utils"

export async function selectionSort(list, setList, start, setStart, speed) {
    setStart((prev) => !prev)
    let arr = list.slice()

    for (let i = 0; i < arr.length; i++) {
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[lowest]) {
                lowest = j
            }
        }
        await swapWithAnimation(arr, lowest, i, speed, setList)
        await green(i)
    }

    setStart((prev) => !prev)

}

async function green(j) {
    let first = document.getElementById(`bar-${j}`)
    first.style.backgroundColor = "green"
}