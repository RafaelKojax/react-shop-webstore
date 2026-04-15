import Header from './components/Header';
import Catalogo from './components/catalogo';

function App() {
  return (
    <div className="App">
      <Header />

      <main style={{ padding: '20px' }}>
        <Catalogo />
      </main>
    </div>
  )
}

export default App;