import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const banners = [
  {
    id: "1",
    image:
      "https://www.bkcoupons.sg/wp-content/uploads/2021/09/Banner-for-test-the-size-1.png",
  },
  {
    id: "2",
    image:
      "https://marketplace.canva.com/EAGTJ2KjXVo/3/0/1600w/canva-orange-and-red-modern-restaurant-promotion-outdoor-banner-2Q8rbxDgzuM.jpg",
  },
];

const AdBanner = () => {
  return (
    <div className="pt-3">
      <Swiper
        className="rounded-2xl"
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop
        speed={1000}
        modules={[Autoplay]}
      >
        {banners.map((banner) => (
          <SwiperSlide
            className="min-h-32 last:rounded-r-2xl first:rounded-l-2xl"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default AdBanner;
