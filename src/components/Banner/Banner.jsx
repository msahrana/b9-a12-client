import {Link} from "react-router-dom";
import BannerImg from "/images/banner.jpg";

const Banner = () => {
  return (
    <div
      className="hero h-[650px]"
      style={{backgroundImage: `url(${BannerImg})`}}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold text-red-500">
            Donate Blood, Safe Life
          </h1>
          <p className="mb-5">
            Donate Blood, Save Lives: Your Gift of Life, Their Hope for Tomorrow
            ...
          </p>
          <Link to="/register">
            <button className="bg-red-500 px-3 py-1 rounded-lg text-xl">
              Join as a donor
            </button>
          </Link>
          <Link to="/search">
            <button className="bg-orange-500 px-3 py-1 rounded-lg text-xl ml-4">
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
