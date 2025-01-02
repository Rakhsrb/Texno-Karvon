import React from "react";
import HeroSection from "./modules/HeroSection";
import AboutSection from "./modules/AboutSection";
import ServicesSection from "./modules/ServicesSection";
import PortfoliosSection from "./modules/PortfoliosSections";

function page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfoliosSection />
    </>
  );
}

export default page;
