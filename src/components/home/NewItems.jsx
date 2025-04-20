import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

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
      style={{ ...style, display: "block", background: "black", fontsize: "40px", borderRadius: "50%", color: "white"
       }}
      onClick={onClick}
    >
      <i className={`fas ${icon1}`}></i>
    </div>
  );
  
  const SamplePrevArrow = ({ className, style, onClick, icon2 }) => (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", fontsize: "40px", borderRadius: "50%", color: "white" }}
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
          dots: true
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    function calculateTimeLeft() {
      const difference = new Date(expiryDate) - new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    }
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer);
    }, [expiryDate]);
  
    if (!expiryDate) return null;

    return (
      <div className="de_countdown">
      {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
        <div className="clock">
        <span className="clock-time">
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        </div>
      ) : (
        <div className="expired">Expired</div>
      )}
      </div>
    );
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
            {loading ? (
              <div className="col-12 text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  className="px-1"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
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

                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
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
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
