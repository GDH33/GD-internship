import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../utilities/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const AuthorItems = ({ authorId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      if (!authorId) {
        setError("Author ID is required");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching items for author:", authorId);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );

        if (response.data && response.data.nftCollection) {
          console.log("NFT Collection:", response.data.nftCollection);
          setData(response.data.nftCollection);
        } else {
          setError("No NFT collection found");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorItems();

    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, [authorId]);

  if (loading) return <div>Loading NFT items...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data || data.length === 0) return <div>No NFT items found</div>;

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div className="px-1" key={`skeleton-${index}`}>
                    <Skeleton />
                  </div>
                ))
            : data.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                  data-aos="fade-down"
                  data-aos-duration="4000"
                >
                  <div className="nft__item">
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
