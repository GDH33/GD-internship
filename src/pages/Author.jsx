import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";
//import Skeleton from "../components/utilities/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        if (response.data && response.data.author) {
          setAuthorData([response.data.author]);
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      } finally {
        setLoading();
      }
    };

    fetchAuthorData();
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        />
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          authorData.map((item, index) => (
            <section aria-label="section" key={index}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={item.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {item.authorName}
                              <span className="profile_username">
                                {item.authorTag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {item.address}
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
                            {item.followers} followers
                          </div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

export default Author;
