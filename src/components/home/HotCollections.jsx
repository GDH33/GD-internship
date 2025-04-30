import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SkeletonComponent from "../utilities/Skeleton";

const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        const dummyData = [
          {
            nftImage: "dummyImage1.png",
            authorImage: "author1.png",
            title: "Collection 1",
            code: "001",
          },
        ];
        setData(dummyData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const SampleNextArrow = ({ className, style, onClick, icon1 }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        fontsize: "40px",
        borderRadius: "50%",
        color: "white",
      }}
      onClick={onClick}
    >
      <i className={`fas ${icon1}`}></i>
    </div>
  );

  const SamplePrevArrow = ({ className, style, onClick, icon2 }) => (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        fontsize: "40px",
        borderRadius: "50%",
        color: "white",
      }}
      onClick={onClick}
    >
      <i className={`fas ${icon2}`}></i>
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow icon1="fa-solid fa-arrow-right" />,
    prevArrow: <SamplePrevArrow icon2="fa-solid fa-arrow-left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className="px-1" key={`skeleton-${index}`}>
                      <SkeletonComponent />
                    </div>
                  ))
              : data.map((item, index) => (
                  <div className="px-1" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt={item.authorName || 'Author'}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title || "Pinky Ocean"}</h4>
                        </Link>
                        <span>ERC-{item.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
