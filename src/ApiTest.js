import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const ApiTest = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const options = [
    { value: "Numbers", label: "Numbers" },
    { value: "Alphabets", label: "Alphabets" },
    {
      value: "Highest lowercase alphabet",
      label: "Highest lowercase alphabet",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions || []);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let result = "";
    selectedFilters.forEach((filter) => {
      if (filter.value === "Numbers")
        result += `Numbers: ${response.numbers.join(",")}\n`;
      if (filter.value === "Alphabets")
        result += `Alphabets: ${response.alphabets.join(",")}\n`;
      if (filter.value === "Highest lowercase alphabet")
        result += `Highest lowercase alphabet: ${response.highest_lowercase_alphabet.join(
          ","
        )}\n`;
    });

    return <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>;
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>API Input</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          placeholder='{"data": ["1", "a", "B", "2", "c"]}'
        />
        <br />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginTop: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {response && (
        <>
          <h3 style={{ marginTop: "20px" }}>Multi Filter</h3>
          <Select
            isMulti
            name="filters"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            value={selectedFilters}
            onChange={handleFilterChange}
          />
          <div style={{ marginTop: "20px" }}>
            <h4>Filtered Response</h4>
            {renderFilteredResponse()}
          </div>
        </>
      )}
    </div>
  );
};

export default ApiTest;
