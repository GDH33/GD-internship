import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/utilities/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false); // Add following state

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
    setIsFollowing(!isFollowing); // Toggle following state
    setAuthorData((prevData) => ({
      ...prevData,
      followers: isFollowing ? prevData.followers - 1 : prevData.followers + 1,
    }));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <div className="px-1" key={`skeleton-${index}`}>
                  <Skeleton />
                </div>
              ))
          : authorData && (
              <>
                <section
                  id="profile_banner"
                  aria-label="section"
                  className="text-light"
                  data-bgimage="url(images/author_banner.jpg) top"
                  style={{ background: `url(${AuthorBanner}) top` }}
                />
                <section aria-label="section">
                  <div className="container">
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
