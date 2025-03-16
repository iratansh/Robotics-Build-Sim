import React from "react";
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  FaRocket,
  FaLightbulb,
  FaMagic,
  FaPalette,
  FaBriefcase,
  FaCogs,
  FaTrophy,
  FaStar,
  FaAirbnb,
  FaGoogle,
  FaAmazon,
} from "react-icons/fa";
import "./LandingPage.css";

const AutoPlayPlugin = (slider) => {
  let timeout;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function LandingPage() {
  const carouselIconComponents = [
    FaRocket,
    FaLightbulb,
    FaMagic,
    FaPalette,
    FaBriefcase,
    FaCogs,
    FaTrophy,
    FaStar,
    FaAirbnb,
    FaGoogle,
    FaAmazon,
  ];

  // Updated slider configuration
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      rtl: false,
      slides: {
        perView: 5,
        spacing: 20, 
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: {
            perView: 4,
            spacing: 20,
          },
        },
        "(max-width: 900px)": {
          slides: {
            perView: 3,
            spacing: 20,
          },
        },
        "(max-width: 600px)": {
          slides: {
            perView: 2,
            spacing: 15,
          },
        },
      },
    },
    [AutoPlayPlugin]
  );

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-wrapper">
        <NavigationBar />
        <section className="hero-section">
          <div className="content-container">
            <div className="text-container">
              <h2 className="heading">Create a logo in minutes</h2>
              <p className="description">
                Our AI-powered logo maker will help you create a beautiful logo
                for your brand in minutes. No design skills needed.
              </p>
              <button className="primary-button">Get Started</button>
            </div>
          </div>
        </section>
      </div>

      {/* SLIDER SECTION */}
      <div className="slider-wrapper">
        <section className="slider-section">
          <div className="carousel-container">
            <div ref={sliderRef} className="keen-slider">
              {carouselIconComponents.map((IconComponent, index) => (
                <div className="keen-slider__slide slider-item" key={index}>
                  <div className="icon-container" style={{ backgroundColor: "#3b82f6"}}>
                    <IconComponent
                      style={{ color: "white", fontSize: "80px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* EXAMPLES SECTION */}
      <div className="examples-wrapper">
        <section className="examples-section">
          <div className="content-container">
            <h2 className="section-title">
              Transform Your Brand Identity with AI Innovation
            </h2>
            <p className="section-subtitle">
              See how industry leaders have leveraged our platform
            </p>

            <div className="example-item">
              <div className="example-content">
                <div className="text-container left-align">
                  <h3>Modern Aesthetics</h3>
                  <p>
                    Craft clean, contemporary designs that resonate with modern
                    audiences. Our AI analyzes current design trends to deliver
                    timeless logos.
                  </p>
                </div>
                <div className="icon-container">
                  <FaAirbnb className="example-icon" />
                </div>
              </div>
            </div>

            <div className="example-item">
              <div className="example-content reverse">
                <div className="icon-container">
                  <FaGoogle className="example-icon" />
                </div>
                <div className="text-container right-align">
                  <h3>Premium Quality</h3>
                  <p>
                    Generate professional-grade logos with perfect symmetry and
                    balance. Our algorithm ensures pixel-perfect precision in
                    every creation.
                  </p>
                </div>
              </div>
            </div>

            <div className="example-item">
              <div className="example-content">
                <div className="text-container left-align">
                  <h3>Enterprise Ready</h3>
                  <p>
                    Scale your branding efforts with solutions that grow with
                    your business. Export in multiple formats for any
                    application.
                  </p>
                </div>
                <div className="icon-container">
                  <FaAmazon className="example-icon" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER SECTION */}
      <Footer />
    </>
  );
}
