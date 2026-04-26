"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Product } from "@/Services/Products/getAllProducts";

// Styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./SingleProductSlider.module.css";

export default function SingleProductSlider({ product }: { product: Product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const images =
    product?.images?.length > 0
      ? [product.imageCover, ...product.images]
      : [product?.imageCover];

  return (
    <div className="w-full">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#10b981",
            "--swiper-pagination-color": "#10b981",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`main-${index}`}>
            <div className="relative aspect-square w-full">
              <Image
                src={img}
                alt={product.title}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`thumb-${index}`} className={styles.thumbSlide}>
            <div className="relative aspect-square w-full cursor-pointer">
              <Image
                src={img}
                alt={`thumb-${index}`}
                fill
                className="object-contain rounded-md p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
