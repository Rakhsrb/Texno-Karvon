import React from "react";
import HeroSection from "./modules/HeroSection";
import AboutSection from "./modules/AboutSection";
import ServicesSection from "./modules/ServicesSection";
import PortfoliosSection from "./modules/PortfoliosSections";
import TeamSection from "./modules/TeamSection";

function page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfoliosSection />
      <TeamSection />
    </>
  );
}

export default page;
