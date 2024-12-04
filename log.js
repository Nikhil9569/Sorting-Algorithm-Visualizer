let array = [];
let arraySize = 50;
const arrayContainer = document.getElementById('arrayContainer');
const suggestionElement = document.getElementById('suggestion');
function generateArray() {
    array = [];
    arraySize = parseInt(document.getElementById('arraySize').value) || 50;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
    suggestAlgorithm();
}
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.textContent = index < array.length - 1 ? `${value},` : value;
        arrayContainer.appendChild(element);
    });
}
function suggestAlgorithm() {
    if (arraySize <= 20) {
        suggestionElement.textContent = "Suggested Algorithm: Bubble Sort (Simple, for small arrays)";
    } else if (arraySize <= 100) {
        suggestionElement.textContent = "Suggested Algorithm: Quick Sort (Efficient for medium-sized arrays)";
    } else {
        suggestionElement.textContent = "Suggested Algorithm: Merge Sort (Stable and efficient for large arrays)";
    }
}
function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
            }
        }
    }
    renderArray();
}
function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const index = partition(start, end);
    quickSort(start, index - 1);
    quickSort(index + 1, end);
    renderArray();
}
function partition(start, end) {
    let pivotIndex = start;
    const pivotValue = array[end];
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            swap(i, pivotIndex);
            pivotIndex++;
        }
    }
    swap(pivotIndex, end);
    return pivotIndex;
}
function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
    renderArray();
}
function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    let k = start, i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k++] = left[i++];
        } else {
            array[k++] = right[j++];
        }
    }
    while (i < left.length) {
        array[k++] = left[i++];
    }
    while (j < right.length) {
        array[k++] = right[j++];
    }
}
function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
document.getElementById('generateArray').addEventListener('click', generateArray);
document.getElementById('startSort').addEventListener('click', () => {
    if (suggestionElement.textContent.includes('Bubble Sort')) {
        bubbleSort();
    } else if (suggestionElement.textContent.includes('Quick Sort')) {
        quickSort(0, array.length - 1);
    } else if (suggestionElement.textContent.includes('Merge Sort')) {
        mergeSort(0, array.length - 1);
    }
});
generateArray();

