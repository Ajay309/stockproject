import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoSection.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('https://dtc.sinfode.com/api/v1/video')
      .then((res) => {
        if (res.data.status === "success") {
          setVideos(res.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching video data:', error);
      });
  }, []);

  const extractYoutubeID = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <p className="small text-muted mb-1">Our Video</p>
        <h2 className="section-title">Video Gallery</h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          576: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {videos.map((video) => {
          const videoId = extractYoutubeID(video.description);
          const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          return (
            <SwiperSlide key={video.id}>
              <div className="video-card rounded overflow-hidden">
                <a
                  href={video.description}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img src={video.image} alt="Video" className="video-thumb" />
                  <div className="video-overlay">
                    <div className="play-btn">&#9658;</div>
                  </div>
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoSection;
