export async function mergeSort(arr, shared) {
    await mergeSortHelper(arr, 0, arr.length - 1, shared);
    shared.setColors(Array(arr.length).fill("sorted"));
  }
  
  async function mergeSortHelper(arr, left, right, { shouldStopRef, setArray, setColors, delay }) {
    if (shouldStopRef.current) return;
    if (left >= right) return;
  
    const mid = Math.floor((left + right) / 2);
  
    await mergeSortHelper(arr, left, mid, { shouldStopRef, setArray, setColors, delay });
    await mergeSortHelper(arr, mid + 1, right, { shouldStopRef, setArray, setColors, delay });
    await merge(arr, left, mid, right, { shouldStopRef, setArray, setColors, delay });
  }
  
  async function merge(arr, left, mid, right, { shouldStopRef, setArray, setColors, delay }) {
    const n = right - left + 1;
    const temp = [];
    let i = left, j = mid + 1;
  
    for (let k = 0; k < n; k++) {
      if (shouldStopRef.current) return;
  
      const newColors = Array(arr.length).fill("default");
      if (i <= mid) newColors[i] = "compare";
      if (j <= right) newColors[j] = "compare";
      setColors(newColors);
  
      if (j > right || (i <= mid && arr[i] <= arr[j])) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }
  
      await delay(50);
    }
  
    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      setArray([...arr]);
  
      const newColors = Array(arr.length).fill("default");
      newColors[left + k] = "swap";
      setColors(newColors);
      await delay(500);
    }
  }
  