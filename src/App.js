import { Provider } from "react-redux";
import "./App.css";
import UiLayout from "./Components/UiLayout";
import store from "./Utils/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <UiLayout />
      </div>
    </Provider>
  );
}

export default App;
