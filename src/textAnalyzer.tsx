import { useState, useEffect } from "react";
import levenshtein from "./levenshtein";
import { useTranslation } from "react-i18next";

const TextAnalyzer = () => {
  const { t } = useTranslation();

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
    alert(t("successfullySaved"));
  };

  const saveText = t("save");

  return (
    <>
      <div className="header">
        <h1>{t("textAnalyzer")}</h1>
      </div>
      <div className="wrapper">
        <div className="row">
          <label>
            {t("enterText")}
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
              value={saveText}
            />
          </label>
        </div>
        <div className="row">
          {t("similarWordEntries")}{" "}
          <span data-testid="similar">
            <b>{similarWords.join(", ")}</b>
          </span>
        </div>
        <div className="row">
          {t("wordFrequency")}{" "}
          <span data-testid="frequency">
            <b>{frequency}</b>
          </span>
        </div>
      </div>
    </>
  );
};


export default TextAnalyzer;
