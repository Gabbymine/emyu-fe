import Collection from "./components/Collection";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Navbar from "./components/Navbar";
import Story from "./components/Story";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Review from "./components/Review";


function App() {
  return <div className="bg-[#991B1B] text-[#F8F6EF]">
  <Navbar/>
  <Hero/>
  <Story/>
  <Mission/>
  <Collection/>
  <Review/>
  <Form/>
  <Footer/>
  </div>;
}

export default App;
