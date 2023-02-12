import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);
  return <>{JSON.stringify(tasks)}</>;
};

export default App;
