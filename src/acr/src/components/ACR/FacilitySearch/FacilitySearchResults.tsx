import { useContext } from 'react';
import { FacilitySearchContext } from './FaciltySearch.context';

import { Text } from '@radix-ui/themes';
import FacilitySearchResult from './FacilitySearchResult';

type FacilitySearchResultsProps = {
  totalResults: number;
};

const FacilitySearchResults = (props: FacilitySearchResultsProps): JSX.Element => {
  const { totalResults } = props;

  const { pageData, labels } = useContext(FacilitySearchContext);

  const { noResultsFoundLabel, resultsFoundLabel } = labels ?? {};

  const resultsString =
    totalResults === 0 ? (
      <>
        {resultsFoundLabel}. {noResultsFoundLabel}
      </>
    ) : (
      <>{totalResults === 1 ? 'result found' : resultsFoundLabel}</>
    );

  return (
    <div
      data-ref="facility-search-results"
      aria-live="polite"
      aria-atomic="true"
      id="facility-search-results"
      tabIndex={-1}
    >
      <Text className="mb-4 mt-12 text-[24px] font-medium md:mb-6" as="p">
        <strong>{totalResults}</strong> {resultsString}
      </Text>
      {pageData?.map((r, index) => <FacilitySearchResult key={index} result={r} index={index} />)}
    </div>
  );
};

export default FacilitySearchResults;
