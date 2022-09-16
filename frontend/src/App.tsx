import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import '@fontsource/inter/700.css'
import { Footer } from "./components/Footer";

function App() {


  return (
    <div className="App">
      <Navbar />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
