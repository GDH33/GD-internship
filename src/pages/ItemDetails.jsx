import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [NFTData, setNFTData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        console.log("Fetching NFT with ID:", nftId);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        console.log("NFT response:", response.data);
        setNFTData(response.data);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
        setNFTData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div
        className="no-bottom no-top"
        id="content"
        data-aos="fade-down"
        data-aos-duration="4000"
      >
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading ? (
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton height="400px" className="mb-sm-30" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton height="40px" width="70%" className="mb-4" />
                    <div className="item_info_counts mb-4">
                      <Skeleton width="120px" className="mr-3" />
                      <Skeleton width="120px" />
                    </div>
                    <Skeleton height="80px" className="mb-4" />
                    <div className="d-flex flex-row mb-4">
                      <div className="mr40">
                        <Skeleton width="60px" className="mb-2" />
                        <div className="item_author">
                          <div className="d-flex align-items-center">
                            <Skeleton
                              width="50px"
                              height="50px"
                              className="rounded-circle mr-3"
                            />
                            <Skeleton width="120px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <Skeleton width="70px" className="mb-2" />
                      <div className="item_author mb-4">
                        <div className="d-flex align-items-center">
                          <Skeleton
                            width="50px"
                            height="50px"
                            className="rounded-circle mr-3"
                          />
                          <Skeleton width="120px" />
                        </div>
                      </div>

                      <div className="spacer-40"></div>
                      <Skeleton width="60px" className="mb-2" />
                      <div className="nft-item-price">
                        <Skeleton width="150px" height="30px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : !NFTData ? (
              <div className="alert alert-danger">NFT not found</div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={NFTData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {NFTData.title} #{NFTData.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {NFTData.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {NFTData.likes}
                      </div>
                    </div>
                    <p>{NFTData.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${NFTData.ownerId}`}>
                              <img
                                className="lazy"
                                src={NFTData.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${NFTData.ownerId}`}>
                              {NFTData.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${NFTData.creatorId}`}>
                              <img
                                className="lazy"
                                src={NFTData.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${NFTData.creatorId}`}>
                              {NFTData.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{NFTData.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
