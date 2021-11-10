import './App.css';
import GlobalContext from './services/globalContext'
// Import Components here
import Navbar from './components/navbar/navbar'
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <GlobalContext.Provider value = {'Hello from GC'}>
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
