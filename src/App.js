import React, { useEffect } from "react";
import ApiTest from "./ApiTest";

function App() {
  useEffect(() => {
    document.title = "21BPS1194";
  }, []);

  return (
    <div className="App">
      <ApiTest />
    </div>
  );
}

export default App;
