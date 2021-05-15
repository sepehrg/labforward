import { render, screen } from "@testing-library/react";
import TextAnalyzer from "./textAnalyzer";
import userEvent from "@testing-library/user-event";

test("check first string", () => {
  render(<TextAnalyzer />);
  userEvent.type(screen.getByLabelText(/Enter/i), "Word Words Wor word");
  expect(screen.getByTestId("similar")).toHaveTextContent("Words, Wor, word");
  expect(screen.getByTestId("frequency")).toHaveTextContent("1");
});

test("check second string", () => {
  render(<TextAnalyzer />);
  userEvent.type(screen.getByLabelText(/Enter/i), "Word Word Word word");
  expect(screen.getByTestId("similar")).toHaveTextContent("word");
  expect(screen.getByTestId("frequency")).toHaveTextContent("3");
});
