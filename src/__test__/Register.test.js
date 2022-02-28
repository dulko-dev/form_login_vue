import { render, fireEvent, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Register from "../components/Register.vue";
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

// describe("Firebase", async () => {
//   beforeEach(() => {
//     render(Register, wrapper);
//   });

//   test("login by firebase", async () => {
//     const { createUserWithEmailAndPassword } =
//       require("../firebase/config.js").default;
//     const email = "123dulko@wp.pl";
//     createUserWithEmailAndPassword.mockReturnValue({
//       user: email,
//     });

//     const {email, password, }
//   });
// });

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
  test("show error", async () => {
    const usernameInput = screen.getByPlaceholderText(/user name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /sign up/i });

    await fireEvent.update(usernameInput, "dulko");
    await fireEvent.update(emailInput, "admin@dev.pl");
    await fireEvent.update(passwordInput, "123test");
    await fireEvent.click(button);
  });
});
