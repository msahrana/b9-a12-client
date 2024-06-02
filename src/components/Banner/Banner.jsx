import BannerImg from "/images/banner.jpg";

const Banner = () => {
  return (
    <div>
      <img
        className=" w-full h-[100x] md:h-[650px] rounded"
        src={BannerImg}
        alt=""
      />
    </div>
  );
};

export default Banner;
