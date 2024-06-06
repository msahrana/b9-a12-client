import Img1 from "/images/welcome1.png";
import Img2 from "/images/welcome2.png";

const Welcome = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-10 md:px-32">
      <div className="md:w-1/2">
        <img src={Img1} alt="" />
        <img
          className="md:translate-x-72 md:-translate-y-96"
          src={Img2}
          alt=""
        />
      </div>
      <div className="md:mt-40 space-y-3 md:w-1/2 text-justify p-2">
        <h2 className="text-red-500 font-semibold">HELP THE PEOPLE IN NEED</h2>
        <h1 className="text-2xl md:text-5xl font-bold">
          Welcome to Blood <br />
          Donors Organization
        </h1>
        <p>
          Welcome to{" "}
          <span className="text-red-500 font-semibold">Life Line</span>, where
          every drop counts. Your decision to donate blood can be a lifeline for
          someone in need. Together, we can make a significant impact on
          countless lives. Thank you for your selflessness and support in our
          mission to bring hope and healing to those most in need.{" "}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
