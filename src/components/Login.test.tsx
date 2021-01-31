import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Login from "./Login";

const signIn = jest.fn();
const user = "user";

describe("<Login />", () => {
  test("renders login button as expected", () => {
    const { getByTestId, getByText } = render(
      <Login signIn={signIn} user={user} />
    );

    expect(getByTestId("login-button")).toBeInTheDocument();
    expect(getByText("Let's go")).toBeInTheDocument();
  });

  test("clicking login button calls sign in", () => {
    const { getByTestId } = render(<Login signIn={signIn} user={user} />);
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(signIn).toHaveBeenCalled();
  });
});
