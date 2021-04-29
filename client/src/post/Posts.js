import React, { Component } from "react";
import { List } from "./apiPost";
import { Link } from "react-router-dom";
import mountain from '../images/mountain.jpg';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount = () => {
    List().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Recent Posts</h2>
        <div className="row">
          {posts.map((post, i) => {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
            const posterName = post.postedBy ? post.postedBy.name : " Unknown";

            return (
              <div className="card col-md-4" key={i}>
                <div className="card-body">
                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title}
                  onError={i => i.target.src = `${mountain}`}
                  className="img-thumbnail mb-3"
                  style={{height:"200px", width:"400px"}}
                />
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body.substring(0,100)}</p>
                  <br />
                  <p className="font-italic mark">
                    Posted by <Link to={`${posterId}`}>{posterName} </Link>
                    on {new Date(post.created).toDateString()}
                  </p>
                  
                  <Link
                    to={`/posts/${post._id}`}
                    className="btn btn-raised btn-primary btn-sm"
                  >
                    Read More
                  </Link>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
