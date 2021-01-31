import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Welcome from "./Welcome";

const signIn = jest.fn();
const user = "user";

describe("<Welcome />", () => {
  test("renders welcome page as expected", () => {
    const { getByTestId, getByText } = render(
      <Welcome signIn={signIn} user={user} />
    );

    expect(getByTestId("welcome-page")).toBeInTheDocument();
    expect(getByTestId("welcome-title")).toBeInTheDocument();
    expect(getByText("Welcome")).toBeInTheDocument();
    expect(getByTestId("welcome-img")).toBeInTheDocument();
    expect(getByTestId("welcome-body")).toBeInTheDocument();
    expect(
      getByText("Are you ready to start your own race?")
    ).toBeInTheDocument();
    expect(getByTestId("login-button")).toBeInTheDocument();
    expect(getByText("Let's go")).toBeInTheDocument();
  });

  test("clicking login button calls sign in", () => {
    const { getByTestId } = render(<Welcome signIn={signIn} user={user} />);
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);
    expect(signIn).toHaveBeenCalled();
  });
});
