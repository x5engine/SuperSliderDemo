import React, { useState } from "react";
// import "./styles.css";
import SuperSlider from "super-react-slider";

export default function App() {
  const [value, setValue] = useState(0);
  const [localBoxValue, setBoxValue] = useState(0);

  const handleChange = (val, x) => {
    console.log("change", val, x);
    setValue(val);
    setBoxValue(val * 500);
  };

  return (
    <div className="App">
      <h1>Humble Super Duper Epic React Slider </h1>
      <h2>Start playing to see some super duper epic magic happen!</h2>
      <br />
      <br />
      <SuperSlider
        value={value}
        min={0}
        max={100}
        ticks={true}
        displayPopover={true}
        popoverValue={<h1>Epico {value}</h1>}
        displayBox={true}
        boxValue={localBoxValue + " X5T"}
        handleColor={"magenta"}
        markers={[{ value: 10, label: "Three" }, { value: 5, label: "Eight" }]}
        onChange={handleChange}
      />
    </div>
  );
}
