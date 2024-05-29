import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Enter your question</h1>
      <div>
        <form action="https://localhost:3002/test" method="post">
          <input type="text" name="" id="" />
        </form>
      </div>
      <button className="btn btn-primary">Primary Button</button>
    </div>
  );
}

export default App;
