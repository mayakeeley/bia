import * as React from "react";

export interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

const context = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = context.Provider;

export const AppContextConsumer = context.Consumer;
