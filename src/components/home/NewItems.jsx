import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Skeleton from "../utilities/Skeleton";
import CountdownTimer from "../utilities/CountdownTimer";

const NewItems = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div className="px-1" key={`skeleton-${index}`}>
                      <Skeleton />
                    </div>
                  ))
              : data.map((item, index) => (
                  <div className="px-1" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                        to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && (
                        <div>
                          <CountdownTimer expiryDate={item.expiryDate} />
                        </div>
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
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

export default NewItems;
