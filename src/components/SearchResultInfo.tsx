import { Link } from "react-router-dom";

interface SearchResultInfoProps {
  total: number;
  city: string;
}

const SearchResultInfo = ({ total, city }: SearchResultInfoProps) => {
  return (

      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="text-sm pl-3 font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>

  );
};

export default SearchResultInfo;
