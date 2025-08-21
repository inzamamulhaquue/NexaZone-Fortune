import TopBar from "./components/TopBar";
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FactsFrenzy from "./components/FactFrenzy";
import WhyUsSection from "./components/WhyUsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";


import ChatAISection from "./components/ChatAiSection";




function App() {
  return (
    <div>
      <TopBar />
      <HeaderSection />
      <HeroSection/>
      <ChatAISection />
      {/* The ChatAISection is now included in the main flow of the app */}
      <AboutSection />
      <FactsFrenzy />
      <WhyUsSection />
      <FaqSection />
      <ContactSection/> 
      {/* Add more sections as needed */}
      <main>
      </main>
    </div>
  );
}

export default App;

