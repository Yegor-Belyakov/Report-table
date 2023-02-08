import { useState } from "react";
import "./App.css";
import Report from "./components/Report";
import { data } from "./mockData/data";

function App() {
  const [fruits, setFruits] = useState(data.columns);

  const handleDelete = (id) => {
    setFruits(fruits.filter((el) => el.dataField !== id));
  };

  return (
    <Report fruits={fruits} handleDelete={handleDelete} setFruits={setFruits} />
  );
}

export default App;
