import {Link} from "react-router-dom";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-6 bg-[#EA062B] p-2 justify-center items-center md:p-20">
      <div className="w-[70%] text-white space-y-4">
        <h1 className="text-2xl md:text-5xl font-bold">
          Let`s change the world, Join us now!
        </h1>
        <p>
          Nor again is there anyone who loves or pursues or desires to obtain
          pain of itself, because it is pain, but occasionally circumstances
          occur in which toil and pain can procure real pleasure.
        </p>
      </div>
      <Link to="/contactForm">
        <button className="bg-white px-10 py-4 font-bold hover:bg-black hover:text-white text-xl">
          Contact Us
        </button>
      </Link>
    </div>
  );
};

export default Contact;
