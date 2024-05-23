import { useContext } from 'react';

import { FacilitySearchProps } from 'components/ACR/FacilitySearch/FacilitySearch.props';

import SearchResults from './FacilitySearchResults';
import PaginationBase from '../Pagination/PaginationBase';
import SearchFilters from './FacilitySearchFilters';
import { FacilitySearchContext } from './FaciltySearch.context';

const FacilitySearch = (props: FacilitySearchProps): JSX.Element => {
  const { searchResults, setPageData } = useContext(FacilitySearchContext);

  return (
    <>
      <SearchFilters {...props} />
      <SearchResults totalResults={searchResults?.length} />
      <PaginationBase items={searchResults} setPageItems={setPageData} />
    </>
  );
};

export default FacilitySearch;
