import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <div className="sticky-header">
        <h1>Weather App</h1>
      </div>
      <Weather />
    </div>
  );
}

export default App;
