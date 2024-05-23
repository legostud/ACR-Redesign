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

  const resultsString =
    totalResults === 0 ? (
      <>
        <Text field={resultsFoundLabel} /> <Text field={noResultsFoundLabel} />
      </>
    ) : (
      <>{totalResults === 1 ? 'result' : 'results'} found</>
    );

  return (
    <div data-ref="facility-search-results">
      <RxText className="mb-4 mt-12 text-[24px] font-medium md:mb-6" as="p">
        <strong>{totalResults}</strong> {resultsString}
      </RxText>
      {pageData?.map((r, index) => <FacilitySearchResult key={index} result={r} />)}
    </div>
  );
};

export default FacilitySearchResults;
