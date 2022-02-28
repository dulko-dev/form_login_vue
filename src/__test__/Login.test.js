import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Login from "../../src/components/Login.vue";
import mystore from "../store/index.js";
import { routes } from "../router/index.js";
import { createRouter, createWebHistory } from "vue-router";
import User from "../views/User.vue";
import Form from "../views/Form.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const wrapper = {
  global: {
    plugins: [mystore, router],
    provide: {
      FormLogin: Form,
    },
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
  test("find input password", async () => {
    const inputPassword = screen.getByPlaceholderText(/password/i);
    await fireEvent.update(inputPassword, "password");
    expect(inputPassword.value).toBe("password");
  });
});

describe("log in to user", () => {
  beforeEach(() => {
    render(Login, wrapper);
  });
  test("click on guestLogin", async () => {
    const button = screen.getByRole("button", { name: "Login as Guest" });
    await fireEvent.click(button).then(() => render(User, wrapper));
    const logOutBtn = screen.getByRole("button", { name: "LogOut" });
    expect(logOutBtn).toBeInTheDocument();
  });
  test("click on login", async () => {
    const inputLogin = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const btnLogin = screen.getByRole("button", { name: "Login" });
    await fireEvent.update(inputLogin, "admin@dev");
    await fireEvent.update(password, "123test");
    await fireEvent.click(btnLogin).then(() => render(User, wrapper));
    const logOutBtn = screen.getByRole("button", { name: "LogOut" });
    expect(logOutBtn).toBeInTheDocument();
  });
});
