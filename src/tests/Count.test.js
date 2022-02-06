import { render, fireEvent } from "@testing-library/vue";
import Component from "../App.vue";

test("increment value on click", async () => {
  const { getByText } = render(Component);
  getByText("Time clicked:0");

  const button = getByText("add");

  await fireEvent.click(button);
  await fireEvent.click(button);
  getByText("Time clicked:2");
});
