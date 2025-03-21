"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../components/header";
import Heading from "../components/heading";
import axiosInstance from "@/utils/axiosInstance";

// Create axios instance with default config
const api = axiosInstance

const Updates = () => {
  const [activeTab, setActiveTab] = useState("announcement");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleItems, setVisibleItems] = useState({
    announcement: 5,
    news: 3,
    blogs: 3,
  });

  const [data, setData] = useState({
    announcement: [],
    news: [],
    blogs: [],
    gallery: [],
  });

  // Fetch data using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: items } = await api.get('/updates');
        
        // Organize data by type
        setData({
          announcement: items.filter(item => item.type === 'announcement'),
          news: items.filter(item => item.type === 'news'),
          blogs: items.filter(item => item.type === 'blogs'),
          gallery: items.filter(item => item.type === 'gallery'),
        });
      } catch (err) {
        setError(
          err.response?.data?.message || 
          err.message || 
          'Failed to fetch updates'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = (type) => {
    setVisibleItems((prev) => ({
      ...prev,
      [type]: prev[type] + (type === "announcement" ? 5 : 3),
    }));
  };

  const tabs = [
    { id: "announcement", label: "Announcement" },
    { id: "news", label: "News" },
    { id: "blogs", label: "Blogs" },
  ];

  const ThumbnailStrip = ({ images, selected, onSelect }) => (
    <div className="flex flex-col gap-2 w-16">
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image.imageUrl || '/placeholder.jpg'}
          alt={`Thumbnail ${idx + 1}`}
          className={`w-16 h-16 object-cover cursor-pointer ${
            selected === idx ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
  );

  const ContentSection = ({ type }) => {
    const items = data[type].slice(0, visibleItems[type]);
    const hasMore = visibleItems[type] < data[type].length;

    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item._id || index} className="flex gap-4 bg-white p-4 rounded shadow">
            {item.imageUrl && type !== "announcement" && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            {!item.imageUrl && type !== "announcement" && (
              <img
                src="https://via.placeholder.com/150"
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            {type === "announcement" && (
              <img
                src="/announcement.svg"
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                {item.title ? (
                  <h3 className="font-bold">{item.title}</h3>
                ) : (
                  <div className="font-semibold">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                )}
                {type === "blogs" && item.redirectUrl && (
                  <a 
                    href={item.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-gray-600">{item.content}</p>
            </div>
          </div>
        ))}
        {hasMore && (
          <button
            className="bg-orange-300 px-4 py-2 rounded mx-auto block"
            onClick={() => loadMore(type)}
          >
            Load more
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Header description="Transforms visions into reality, blending innovation with collaborative growth" />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab.id
                  ? "bg-red-300"
                  : "bg-white border border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ContentSection type={activeTab} />

        {/* Gallery Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <Heading heading="Gallery" route="/updates" />
            <div className="flex gap-2">
              <button
                className="p-2 bg-orange-300 rounded-full hover:bg-orange-400"
                id="gallery-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-orange-300 rounded-full hover:bg-orange-400"
                id="gallery-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              prevEl: "#gallery-prev",
              nextEl: "#gallery-next",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="relative mt-4"
          >
            {data.gallery.map((image, index) => (
              <SwiperSlide key={image._id || index}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(index);
                    setShowModal(true);
                  }}
                >
                  <img
                    src={image.imageUrl || '/placeholder.jpg'}
                    alt={image.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white text-center p-2">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal */}
        {showModal && data.gallery[selectedImage] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full">
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 flex gap-4">
                <ThumbnailStrip
                  images={data.gallery}
                  selected={selectedImage}
                  onSelect={setSelectedImage}
                />
                <div className="flex-1">
                  <img
                    src={data.gallery[selectedImage].imageUrl || '/placeholder.jpg'}
                    alt={data.gallery[selectedImage].title}
                    className="rounded mb-4"
                  />
                  <h3 className="text-xl font-bold">
                    {data.gallery[selectedImage].title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {data.gallery[selectedImage].content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Updates;