import {Link} from "react-router-dom";

const BlogsCard = ({blog}) => {
  const {image_url, title, status, _id} = blog || {};

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-60" src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Name: {title}</h2>
        <p>Status: {status}</p>
        <div className="card-actions justify-center">
          <Link to={`/blogDetails/${_id}`}>
            <button className="bg-red-500 text-white text-xl px-4 py-1 rounded-xl">
              View details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
