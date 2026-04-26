"use client";

import React from "react";
import Slider from "react-slick";
import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainHero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "20px" }}>
        <ul className="custom-dots m-0 p-0"> {dots} </ul>
      </div>
    ),
  };

  const slides = [
    {
      id: 1,
      title: "Fresh Products Delivered to your Door",
      desc: "Get 20% off your first order",
      firstBtn: "Shop Now",
      secondBtn: "View Deals",
    },
    {
      id: 2,
      title: "Premium Quality Guaranteed",
      desc: "Fresh from farm to your table",
      firstBtn: "Shop Now",
      secondBtn: "Learn More",
    },
    {
      id: 3,
      title: "Fast & Free Delivery",
      desc: "Same day delivery available",
      firstBtn: "Order Now",
      secondBtn: "Delivery Info",
    },
  ];

  return (
    <section className="home-slider overflow-hidden  h-86  group">
      <Slider {...settings} className="h-86">
        {slides.map((slide) => (
          <div key={slide.id} className="outline-none">
            <div
              style={{
                backgroundImage: `url(/home-slider-1.d79601a8.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-86 flex items-center"
            >
              <div className="overlay text-white p-6 lg:p-12 w-full h-full bg-linear-to-r from-green-500/80 to-green-400/40 flex items-center">
                <div className="container mx-auto">
                  <h2 className="text-white text-3xl  font-bold mb-3 max-w-lg leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-base  opacity-95 mb-6">{slide.desc}</p>

                  <div className="flex gap-3">
                    <Link
                      href="/products"
                      className="bg-white border-2 border-white text-green-600 px-6 py-2.5 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg text-sm lg:text-base"
                    >
                      {slide.firstBtn}
                    </Link>
                    <Link
                      href="/deals"
                      className="bg-transparent border-2 border-white/50 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-white/10 hover:scale-105 transition-transform text-sm lg:text-base"
                    >
                      {slide.secondBtn}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
