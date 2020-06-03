import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import "./App.css";

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return { value, onChange };
}

function useFetch(url) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const { data } = await Axios.get(url);
      setPayload(data);
    } catch {
      setError("😭");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callUrl();
  }, []);

  return { payload, loading, error };
}

function App() {
  const name = useInput("");
  console.log(name);
  const { payload, loading, error } = useFetch("https://aws.random.cat/meow");
  return (
    <div className="App">
      <h1>Use Hooks</h1>
      <br />
      <input {...name} placeholder="Whats your name" />
      <br />
      {loading && <span>loading your cat</span>}
      {!loading && error && <span>{error}</span>}
      {!loading && payload && <img src={payload.file} width="250" />}
    </div>
  );
}

// <input {...name} placeholder="whats your name" />
// <input value={name.value} onChange={name.onChange} />

export default App;
