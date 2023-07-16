import logo from './logo.svg';
import './App.css';


function App() {
  function getAPI() {
    console.log("clicked");
    let res = fetch("http://127.0.0.1:9000/api/about-app",{mode:"cors"})
    .then((response) => {console.log(response);}); 
  }
  return (
    <div className="App">
      <button onClick={getAPI}> API testing </button>
    </div>
  );
}

export default App;
