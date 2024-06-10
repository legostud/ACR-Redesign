import { useContext, useEffect, useRef } from 'react';
import { FacilitySearchContext } from './FaciltySearch.context';

import { Text } from '@radix-ui/themes';
import FacilitySearchResult from './FacilitySearchResult';

type FacilitySearchResultsProps = {
  totalResults: number;
};

const FacilitySearchResults = (props: FacilitySearchResultsProps): JSX.Element => {
  const { totalResults } = props;

  const { pagination, labels } = useContext(FacilitySearchContext);

  const { pageData, currentPage, pageLimit } = pagination ?? {};

  const { showingLabel, noResultsFoundLabel, resultsFoundLabel } = labels ?? {};

  const range = `${(currentPage - 1) * pageLimit + 1} - ${Math.min(currentPage * pageLimit, totalResults)}`;

  const resultsString =
    totalResults === 0 ? (
      <>
        <strong>0</strong> {resultsFoundLabel}. {noResultsFoundLabel}
      </>
    ) : (
      <>
        {showingLabel?.replace('{RANGE}', range)} {totalResults} {resultsFoundLabel}
      </>
    );

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultsRef?.current) {
      const firstResult = resultsRef?.current?.querySelector('#fs-result') as HTMLElement;

      if (firstResult) {
        resultsRef?.current?.scrollIntoView({ behavior: 'smooth' });
        firstResult && firstResult.focus();
      }
    }
  }, [resultsRef, currentPage]);

  return (
    <div data-ref="facility-search-results" ref={resultsRef}>
      <Text
        className="mb-4 mt-12 text-[24px] font-medium md:mb-6"
        as="p"
        aria-live="polite"
        aria-atomic
      >
        {resultsString}
      </Text>
      {pageData?.map((r, index) => <FacilitySearchResult key={index} result={r} index={index} />)}
    </div>
  );
};

export default FacilitySearchResults;
