const Footer = () => {
  return (
    <div className="bg-orange-500 py-10  w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-4xl max-[350px]:text-2xl text-white font-bold tracking-tight">
          GoodEats.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4 max-[350px]:text-sm max-[350px]:flex-col max-[350px]:gap-1 max-[350px]:items-center max-[350px]:mt-2">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
