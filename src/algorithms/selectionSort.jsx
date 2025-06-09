export async function selectionSort(arr, { shouldStopRef, setArray, setColors, delay }) {
    const n = arr.length;
  
    for (let i = 0; i < n; i++) {
      if (shouldStopRef.current) return;
  
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (shouldStopRef.current) return;
  
        const newColors = Array(n).fill("default");
        newColors[minIndex] = "compare";
        newColors[j] = "compare";
        setColors(newColors);
  
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
  
        await delay(50);
      }
  
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
  
        const newColors = Array(n).fill("default");
        newColors[i] = "swap";
        newColors[minIndex] = "swap";
        setColors(newColors);
  
        await delay(50);
      }
    }
  
    setColors(Array(n).fill("sorted"));
  }
  