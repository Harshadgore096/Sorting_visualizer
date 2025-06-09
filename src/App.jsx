import { useState, useEffect, useRef } from "react";
import Bar from "./components/Bar";
import { bubbleSort } from "./algorithms/bubleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergerSort";
export default function App() {
  const [array, setArray] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [colors, setColors] = useState([]);
  const [sorting, setSorting] = useState(false);
  const shouldStopRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    if (sorting) return;
    const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 300 + 20));
    setArray(newArray);
    setColors(new Array(50).fill("default"));
  };

  const handleSort = async () => {
    if (sorting) return;
    setSorting(true);
    shouldStopRef.current = false;

    const shared = {
      shouldStopRef,
      setArray,
      setColors,
      delay: (ms) => new Promise((res) => setTimeout(res, ms)),
    };

    if (selectedAlgo === "bubble") {
      await bubbleSort([...array], shared);
    } else if (selectedAlgo === "selection") {
      await selectionSort([...array], shared);
    } else if (selectedAlgo === "insertion") {
      await insertionSort([...array], shared);
    } else if (selectedAlgo === "merge") {
      await mergeSort([...array], shared);
    }

    setSorting(false);
  };

  const handleStop = () => {
    shouldStopRef.current = true;
    setSorting(false);
  };

  return (
    <div>

      
< div className="header">
      <h1>Sorting Visualizer</h1>
    </div>
      <div className="container">
        {array.map((val, i) => (
          <Bar key={i} height={val} color={colors[i]} />
        ))}
      </div>
      <div className="controls">
        <select value={selectedAlgo} onChange={(e) => setSelectedAlgo(e.target.value)}>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
        </select>

        <button onClick={generateArray}>New Array</button>
        <button onClick={handleSort} disabled={sorting}>Sort</button>
        <button onClick={handleStop} disabled={!sorting}>Stop</button>
      </div>
    </div>
  );
}
