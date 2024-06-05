import { useContext } from 'react';

import { FacilitySearchProps } from 'components/ACR/FacilitySearch/FacilitySearch.props';
import { FacilitySearchContext } from './FaciltySearch.context';

import SearchResults from './FacilitySearchResults';
import SearchMap from './FacilitySearchMap';
import SearchFilters from './FacilitySearchFilters';
import PaginationBase from '../Pagination/PaginationBase';
import LoadingWrapper from '../LoadingWrapper/LoadingWrapper';
import SkipLink from '../SkipLink/SkipLink';

const FacilitySearch = (props: FacilitySearchProps): JSX.Element => {
  const { isLoading, searchResults, setPageData } = useContext(FacilitySearchContext);

  return (
    <>
      <LoadingWrapper loading={isLoading}>
        <SearchFilters {...props} />
        {searchResults?.length > 0 && (
          <SkipLink
            anchorId="fs-result"
            text="Skip To Results Listing"
            id="fs-results-skip-link"
            styleClasses="py-2 text-[14px] !top-auto mt-[5px]"
          />
        )}
        <SearchMap />
        {searchResults?.length > 0 && (
          <SkipLink
            anchorId="fs-filters"
            text="Skip To Filters"
            id="fs-filters-skip-link"
            styleClasses="py-2 text-[14px]"
          />
        )}
      </LoadingWrapper>
      <SearchResults totalResults={searchResults?.length} />
      <PaginationBase items={searchResults} setPageItems={setPageData} />
    </>
  );
};

export default FacilitySearch;
