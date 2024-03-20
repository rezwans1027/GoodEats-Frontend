import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router";

export interface SearchState {
  searchQuery: string;
  page?: number;
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const { results } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSelectCuisines = (cuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines: cuisines,
      page: 1,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption,
    }));
  };

  const resetSearchQuery = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="">
        <SearchBar
          searchQuery={searchState.searchQuery}
          placeholder="Search for restaurants"
          onSubmit={setSearchQuery}
          onReset={resetSearchQuery}
        />
        <div className="my-4" />
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row mb-8">
          {results ? (
            <SearchResultInfo city={city!} total={results.pagination.total} />
          ) : (
            <div>Loading...</div>
          )}
          <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>

        {results ? (
          results?.data.map((restaurant) => (
            <SearchResultCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <div>No results found</div>
        )}

        <div className="my-4" />
        {results && (
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
