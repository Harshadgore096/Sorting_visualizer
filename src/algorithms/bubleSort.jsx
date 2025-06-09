export async function bubbleSort(arr, { shouldStopRef, setArray, setColors, delay }) {
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (shouldStopRef.current) return;
  
        const newColors = Array(n).fill("default");
        newColors[j] = "compare";
        newColors[j + 1] = "compare";
        setColors(newColors);
  
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          newColors[j] = newColors[j + 1] = "swap";
          setColors(newColors);
        }
  
        await delay(1000);
      }
    }
  
    const finalColors = Array(n).fill("sorted");
    setColors(finalColors);
  }
  