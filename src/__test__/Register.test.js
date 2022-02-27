import { render, fireEvent, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Register from "../components/Register.vue";
import mystore from "../store/index.js";
import { routes } from "../router/index.js";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import User from "../views/User.vue";

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

describe("Register option", () => {
  beforeEach(async () => {
    render(Register, wrapper);
    const title = screen.getByRole("heading", { name: /sign up/i });
    await fireEvent.click(title);
  });

  test("find register", () => {
    expect(screen.getByRole("button", { name: "Sign up" }));
  });
  test("complete register", async () => {
    const usernameInput = screen.getByPlaceholderText(/user name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const registerButton = screen.getByRole("button", { name: "Sign up" });

    await fireEvent.update(usernameInput, "123admin");
    await fireEvent.update(emailInput, "admin@dev.test");
    await fireEvent.update(passwordInput, "123test");

    await fireEvent.click(registerButton).then(() => render(User, wrapper));
    const buttonLogOut = screen.getByRole("button", { name: "LogOut" });
    expect(buttonLogOut).toHaveTextContent("LogOut");
  });
});
