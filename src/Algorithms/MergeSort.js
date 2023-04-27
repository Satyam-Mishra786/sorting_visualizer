import { sleep } from "../Utils";

export function mergeSort(list, setList, start, setStart, speed) {
    let arr = list.slice();

    mergeSort2(arr, 0, arr.length - 1, list, setList, speed)
    setList([...arr])
}

function mergeSort2(arr, low, high, list, setList, speed) {
    if (low >= high) return;
    let mid = low + (high - low) / 2

    mergeSort2(arr, low, mid);
    mergeSort2(arr, mid + 1, high)
    merge(arr, low, mid, high, list, setList, speed)
}

function merge(arr, l, m, r, list, setList, speed) {
    var n1 = m - l + 1;
    var n2 = r - m;

    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++)
        L[i].push = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }

}