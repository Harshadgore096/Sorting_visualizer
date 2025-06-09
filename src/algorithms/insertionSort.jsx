export async function insertionSort(arr, { shouldStopRef, setArray, setColors, delay }) {
    const n = arr.length;
  
    for (let i = 1; i < n; i++) {
      if (shouldStopRef.current) return;
  
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        if (shouldStopRef.current) return;
  
        arr[j + 1] = arr[j];
  
        const newColors = Array(n).fill("default");
        newColors[j] = "compare";
        newColors[j + 1] = "swap";
        setColors(newColors);
        setArray([...arr]);
        await delay(1000);
  
        j--;
      }
  
      arr[j + 1] = key;
      setArray([...arr]);
    }
  
    setColors(Array(n).fill("sorted"));
  }
  