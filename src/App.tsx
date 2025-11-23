import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="bg-[#991B1B] text-[#F8F6EF] min-h-screen">
      <Navbar />
      <LandingPage />
      
      <Footer />
    </div>
  );
}

export default App;
