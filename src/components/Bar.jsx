export default function Bar({ height, color }) {
    const backgroundColor =
      color === "compare" ? "#f39c12" :
      color === "swap" ? "#e74c3c" :
      color === "sorted" ? "#2ecc71" :
      "#61dafb";
  
    return <div className="bar" style={{ height: `${height}px`, width: "10px", backgroundColor }} />;
  }
  