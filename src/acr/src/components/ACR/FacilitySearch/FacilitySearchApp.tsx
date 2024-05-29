import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { FacilitySearchProps } from 'components/ACR/FacilitySearch/FacilitySearch.props';
import {
  StateRequest,
  getStaticPropsForFacilitySearch,
} from 'components/ACR/FacilitySearch/FacilitySearch.util';
import { FacilitySearchProvider } from './FaciltySearch.context';

import { useI18n } from 'next-localization';
import { dictionaryKeys } from 'src/variables/dictionary';

import FacilitySearch from './FacilitySearch';

const FacilitySearchApp = (props: FacilitySearchProps): JSX.Element => {
  const { testId } = props;

  const { t } = useI18n();

  const labels = {
    searchByLabel: t(dictionaryKeys.FACILITY_SEARCH_BY),
    zipCityLabel: t(dictionaryKeys.FACILITY_SEARCH_ZIPCITY),
    zipCityErrorLabel: t(dictionaryKeys.FACILITY_SEARCH_ZIPCITY_ERROR),
    stateTerritoryLabel: t(dictionaryKeys.FACILITY_SEARCH_STATE_TERRITORY),
    countryLabel: t(dictionaryKeys.FACILITY_SEARCH_COUNTRY),
    facilityNameLabel: t(dictionaryKeys.FACILITY_SEARCH_FACILITY_NAME),
    facilityErrorLabel: t(dictionaryKeys.FACILITY_SEARCH_FACILITY_ERROR),
    withinLabel: t(dictionaryKeys.FACILITY_SEARCH_WITHIN),
    modalityLabel: t(dictionaryKeys.FACILITY_SEARCH_MODALITY),
    designationLabel: t(dictionaryKeys.FACILITY_SEARCH_DESIGNATION),
    resultsFoundLabel: t(dictionaryKeys.FACILITY_SEARCH_RESULTS_FOUND),
    searchButtonLabel: t(dictionaryKeys.FACILITY_SEARCH_SEARCH),
    noResultsFoundLabel: t(dictionaryKeys.FACILITY_SEARCH_NO_RESULTS),
    accreditedLabel: t(dictionaryKeys.FACILITY_SEARCH_ACCREDITED),
    inProgressLabel: t(dictionaryKeys.FACILITY_SEARCH_IN_PROGRESS),
    modalitiesOfferedLabel: t(dictionaryKeys.FACILITY_SEARCH_MODALITIES_OFFERED),
    viewMapLabel: t(dictionaryKeys.FACILITY_SEARCH_VIEW_MAP),
    getDirectionsLabel: t(dictionaryKeys.FACILITY_SEARCH_GET_DIRECTIONS),
  };

  return (
    <FacilitySearchProvider {...props} labels={labels} testId={testId}>
      <FacilitySearch {...props} />
    </FacilitySearchProvider>
  );
};

/**
 * "Data" developer method
 * TODO_SCAFFOLD_BE: If "getStaticProps" was deleted remove "useComponentProps". They work together.
 * TODO_SCAFFOLD_BE: Populate if needed, remove if not
 * Will be called during SSG.  Do NOT return null.
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
export const getStaticProps: GetStaticComponentProps = async (_rendering, _layoutData) => {
  const request: StateRequest = {
    isPageEditing: _layoutData?.sitecore?.context?.pageEditing ?? false,
    language: _layoutData?.sitecore?.context?.language,
  };
  return await getStaticPropsForFacilitySearch(_rendering, request);
};

export default FacilitySearchApp;

