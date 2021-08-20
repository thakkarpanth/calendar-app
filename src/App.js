import { setupWorker } from "msw";
import Home from "./pages/Home";

if(process.env.NODE_ENV === 'development'){
  console.log('z2 herre  ');
  const {handlers} = require('./mockApi');
  const worker = setupWorker(...handlers);
  worker.start();
}
function App() {
  return (
    <div className="App">
        <Home/>
    </div>
  );
}

export default App;
