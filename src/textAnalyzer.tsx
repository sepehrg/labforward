import { useState, useEffect } from "react";
import levenshtein from "./levenshtein";

const TextAnalyzer = () => {
  const [similarWords, setSimilarWords] = useState<string[]>([]);
  const [frequency, setFrequency] = useState(0);
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem("note") || ""
  );

  useEffect(() => {
    setSimilarWords(
      inputValue
        .split(" ")
        .reduce(
          (acc: string[], word) =>
            levenshtein.getEditDistance(word, "Word") === 1
              ? [...acc, word]
              : acc,
          []
        )
    );
    setFrequency(
      inputValue
        .split(" ")
        .reduce((acc: number, word) => (word === "Word" ? acc + 1 : acc), 0)
    );
  }, [inputValue]);

  const saveInputValue = () => {
    localStorage.setItem("note", inputValue);
    alert("Successfully saved!");
  };

  return (
    <>
      <div className="header">
        <h1>Text Analyzer</h1>
      </div>
      <div className="wrapper">
        <div className="row">
          <label>
            Enter text:
            <input
              type="tea"
              name="note"
              className="entryInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
            ></input>
            <input
              type="button"
              className="saveButton"
              onClick={saveInputValue}
              value="Save"
            />
          </label>
        </div>
        <div className="row">
          Similar "Word" entries:{" "}
          <span data-testid="similar">{similarWords.join(", ")}</span>
        </div>
        <div className="row">
          "Word" frequency: <span data-testid="frequency">{frequency}</span>
        </div>
      </div>
    </>
  );
};

export default TextAnalyzer;
