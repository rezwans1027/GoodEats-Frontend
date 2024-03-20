import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router";

const HomePage = () => {
 const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    })
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="lg:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="sm:text-5xl min-[400px]:text-4xl text-2xl font-bold tracking-tight text-orange-600">
          Tuck into a takeaway today
        </h1>
        <span className="min-[400px]:text-xl">Food is just a click away</span>
        <SearchBar onSubmit={handleSearchSubmit} placeholder="Search by City or Town" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the GoodEats app and for quicker ordering and personalized
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
