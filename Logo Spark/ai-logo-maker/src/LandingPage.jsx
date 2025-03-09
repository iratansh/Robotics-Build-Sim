import React from "react";
import NavigationBar from "./Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaRocket,
  FaLightbulb,
  FaMagic,
  FaPalette,
  FaBriefcase,
  FaCogs,
  FaTrophy,
  FaStar,
} from "react-icons/fa";

export default function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  // Store component references
  const carouselIconComponents = [
    FaRocket,
    FaLightbulb,
    FaMagic,
    FaPalette,
    FaBriefcase,
    FaCogs,
    FaTrophy,
    FaStar,
  ];

  return (
    <>
      <NavigationBar />
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Create a logo in minutes</h2>
            <p className="text-gray-600 mt-4">
              Our AI-powered logo maker will help you create a beautiful logo
              for your brand in minutes. No design skills needed.
            </p>
            <button className="btn btn-primary mt-8">Get Started</button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <Slider {...sliderSettings}>
            {carouselIconComponents.map((IconComponent, index) => (
              <div key={index}>
                <div
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#444",
                  }}
                >
                  <IconComponent style={{ color: "white", fontSize: "48px" }} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
