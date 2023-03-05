import './App.css';
import GamePlate from "./components/GamePlate";
import StateProvider from "./components/context/StateContext/StateProvider";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <GamePlate />
      </StateProvider>
    </div>
  );
}

export default App;
