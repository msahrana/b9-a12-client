import {useLoaderData} from "react-router-dom";

const BlogDetails = () => {
  const item = useLoaderData();

  const {image_url, title, status, content} = item || {};

  return (
    <div className="min-h-[calc(100vh-172px)]">
      <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
        <figure>
          <img src={image_url} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <span className="text-green-500">Name:</span> {title}
          </h2>
          <p>
            <span className="text-red-500 font-bold">Status:</span> {status}
          </p>
          <p>
            <span className="text-blue-500 font-bold">Description: </span>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
