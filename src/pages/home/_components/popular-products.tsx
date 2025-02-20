import ProductCard from "@/components/product-card";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularProducts = () => {

  return (
    <div className="pt-5">
      <h1 className="font-semibold text-2xl font-baloo text-tp-main">
        🔥 Ommabop mahsulotlar
      </h1>

      <Swiper
        spaceBetween={12}
        slidesPerView={2.2}
        className="!-mx-2 mt-2"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide className="first:ml-2" key={index}>
            <ProductCard  />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProducts;
