import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';

import { FacilitySearchProps } from 'components/ACR/FacilitySearch/FacilitySearch.props';

import {
  StateRequest,
  getStaticPropsForFacilitySearch,
} from 'components/ACR/FacilitySearch/FacilitySearch.util';

import { FacilitySearchProvider } from './FaciltySearch.context';
import FacilitySearch from './FacilitySearch';

const FacilitySearchApp = (props: FacilitySearchProps): JSX.Element => {
  const { testId } = props;

  return (
    <FacilitySearchProvider {...props} data-ref="facility-search" data-testid={testId}>
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

