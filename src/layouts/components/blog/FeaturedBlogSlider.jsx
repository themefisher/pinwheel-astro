import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper core and modules directly from 'swiper'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import dateFormat from '@lib/utils/dateFormat'; // Assume dateFormat is usable in React, might need adaptation or pass formatted date
import readingTime from '@lib/utils/readingTime'; // Assume readingTime is usable in React
import { humanize, plainify, slugi } from '@lib/utils/textConverter'; // Assume these are usable or pass pre-processed data

// Install modules using SwiperCore.use()
SwiperCore.use([Navigation, Pagination, Autoplay]);

const FeaturedBlogSlider = ({ posts, summaryLength }) => {
  return (
    <div className="featured-posts-slider">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 5000, // 5 seconds delay
          disableOnInteraction: false, // Keep autoplaying even if user interacts
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.slug}>
            <div className="card flex flex-col md:flex-row h-full relative"> {/* Added relative positioning */}
              {post.image?.fields?.file && (
                <div className="w-full md:w-1/2 h-72 md:h-auto overflow-hidden rounded-t-lg md:rounded-l-lg md::rounded-t-none relative"> {/* Added relative positioning to image container */}
                  <img
                    className="w-full h-full object-cover"
                    src={post.image.fields.file.url}
                    alt={post.image.fields.file.fileName}
                  />
                   {/* Moved categories inside image container and adjusted positioning to top right */}
                   <div className="card-tags absolute top-0 right-0 p-4 z-10 space-x-1 flex flex-wrap justify-end"> {/* Changed bottom-0 to top-0 */}
                      {post.categories.map((category) => (
                        <a key={category} className="tag" href={`/categories/${slugi(category)}`}>
                          {humanize(category)}
                        </a>
                      ))}
                    </div>
                </div>
              )}
              <div className="card-content flex-1 p-6 flex flex-col">
                {/* Removed mb-4 from here as categories are moved */}
                <h3 className="h4 card-title mb-3">
                  <a href={`/actualites/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="mb-4 text-text flex-1">
                  {plainify(
                    post.contenu
                      ?.slice(0, Number(summaryLength))
                  )}
                  ...
                </p>
                <div className="card-footer mt-auto flex space-x-4 text-xs text-[#666]">
                  <span className="inline-flex items-center">
                    <svg
                      className="mr-1.5"
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z"
                        fill="#939393"
                      />
                    </svg>
                    {dateFormat(post.date)}
                  </span>
                  <span className="inline-flex items-center">
                    <svg
                      className="mr-1.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                        fill="#939393"
                      />
                    </svg>
                    {readingTime(post.contenu)}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedBlogSlider;