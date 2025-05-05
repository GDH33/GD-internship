import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    AOS.init({});
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        console.log("Fetching author with ID:", authorId);
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        console.log("Author response:", response.data);
        setAuthorData(response.data);
      } catch (error) {
        console.error("Error fetching author data:", error);
        setAuthorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setAuthorData((prevData) => ({
      ...prevData,
      followers: isFollowing ? prevData.followers - 1 : prevData.followers + 1,
    }));
  };

  const renderSkeletonLoading = () => (
    <>
      <section
        id="profile_banner"
        aria-label="section"
        className="text-light"
        style={{ background: "#eee", height: "250px" }}
      />
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <Skeleton
                      width="150px"
                      height="150px"
                      className="rounded-circle mb-3"
                    />
                    <div className="profile_name">
                      <Skeleton width="200px" height="24px" className="mb-2" />
                      <Skeleton width="150px" height="18px" className="mb-2" />
                      <Skeleton width="300px" height="16px" className="mb-2" />
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <Skeleton width="120px" height="20px" className="mb-2" />
                    <Skeleton width="100px" height="36px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <div className="row">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        key={index}
                      >
                        <div className="nft__item">
                          <Skeleton height="200px" className="mb-3" />
                          <Skeleton
                            width="70%"
                            height="24px"
                            className="mb-2"
                          />
                          <Skeleton width="40%" height="18px" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading ? (
          renderSkeletonLoading()
        ) : !authorData ? (
          <div className="container">
            <div className="alert alert-danger">Author not found</div>
          </div>
        ) : (
          <>
            <section
              id="profile_banner"
              aria-label="section"
              className="text-light"
              data-bgimage="url(images/author_banner.jpg) top"
              style={{ background: `url(${AuthorBanner}) top` }}
            />
            <section aria-label="section">
              <div
                className="container"
                data-aos="fade-down"
                data-aos-duration="4000"
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={authorData.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">
                                {authorData.authorTag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {authorData.followers} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={handleFollow}
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems authorId={authorId} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Author;
