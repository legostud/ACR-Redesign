import { useContext } from 'react';

import { FacilitySearchProps } from 'components/ACR/FacilitySearch/FacilitySearch.props';
import { FacilitySearchContext } from './FaciltySearch.context';

import SearchResults from './FacilitySearchResults';
import SearchMap from './FacilitySearchMap';
import SearchFilters from './FacilitySearchFilters';
import PaginationBase from '../Pagination/PaginationBase';
import LoadingWrapper from '../LoadingWrapper/LoadingWrapper';

const FacilitySearch = (props: FacilitySearchProps): JSX.Element => {
  const { isLoading, searchResults, setPageData } = useContext(FacilitySearchContext);

  return (
    <>
      <LoadingWrapper loading={isLoading}>
        <SearchFilters {...props} />
        <SearchMap />
      </LoadingWrapper>
      <SearchResults totalResults={searchResults?.length} />
      <PaginationBase items={searchResults} setPageItems={setPageData} />
    </>
  );
};

export default FacilitySearch;
