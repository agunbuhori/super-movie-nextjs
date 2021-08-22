import React from "react";
import { Provider } from "react-redux";
import Movies from "../components/Movies/Movies";
import SearchInput from "../components/SearchInput";
import store from "../store";

const App: React.FC<{store?: any}> = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <SearchInput/>
        <Movies/>
      </div>
    </Provider>
  )
}

export default App;