import * as React from "react";
import { AppContextInterface, AppContextProvider } from "./contexts/AppContext";
import Routes from "./routes/Routes";

const sampleAppContext: AppContextInterface = {
  name: "Using React Context in a Typescript App",
  author: "thehappybug",
  url: "http://www.example.com",
};

const App: React.FC = () => (
  <AppContextProvider value={sampleAppContext}>
    <Routes />
  </AppContextProvider>
);

export default App;
