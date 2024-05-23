import { Text as RxText } from '@radix-ui/themes';
import { useContext } from 'react';
import { FacilitySearchContext } from './FaciltySearch.context';
import { Text } from '@sitecore-jss/sitecore-jss-react';

import FacilitySearchResult from './FacilitySearchResult';

type FacilitySearchResultsProps = {
  totalResults: number;
};

const FacilitySearchResults = (props: FacilitySearchResultsProps) => {
  const { totalResults } = props;

  const { pageData, labels } = useContext(FacilitySearchContext);

  const { noResultsFoundLabel, resultsFoundLabel } = labels ?? {};

  return (
    <div data-ref="facility-search-results">
      <RxText className="mb-6 mt-12 text-[24px] font-medium" as="p">
        {totalResults === 0 ? (
          <>
            <strong>{totalResults}</strong> <Text field={resultsFoundLabel} />{' '}
            <Text field={noResultsFoundLabel} />
          </>
        ) : (
          <>
            <strong>{totalResults}</strong> {totalResults === 1 ? 'result' : 'results'} found
          </>
        )}
      </RxText>
      {pageData?.map((r, index) => <FacilitySearchResult key={index} result={r} />)}
    </div>
  );
};

export default FacilitySearchResults;
