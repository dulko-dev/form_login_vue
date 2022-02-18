import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Login from "../../src/components/Login.vue";
import mystore from "../store/index.js";
import { routes } from "../router/index.js";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";

const store = createStore(mystore);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const wrapper = {
  global: {
    plugins: [store, router],
  },
};

describe("Login option", () => {
  beforeEach(() => {
    render(Login, wrapper);
  });
  test("find login", () => {
    const title = screen.getByRole("heading", { name: "Login" });
    expect(title).toBeInTheDocument();
  });
  test("find input email", async () => {
    const inputEmail = screen.getByPlaceholderText(/email/i);
    await fireEvent.update(inputEmail, "admin@dev.pl");
    expect(inputEmail.value).toBe("admin@dev.pl");
  });
});


