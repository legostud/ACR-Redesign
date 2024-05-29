import { ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ReferenceField } from 'src/types/ReferenceField.props';
import { TestProps } from 'src/types/Test.props';
import { ACREnumeration } from 'src/types/enum.props';

/**
 * Model used for Sitecore Component integration
 */
export type FacilitySearchProps = ComponentProps &
  TestProps &
  FacilitySearchFields &
  FacilitySearchLabels &
  FacilitySearchData;

// Non-component data source fields
export type FacilitySearchData = {
  externalFields?: {
    searchOptions: FacilityEnumeration[];
    modalityOptions: FacilityEnumeration[];
    designationOptions: FacilityEnumeration[];
    milesOptions: FacilityEnumeration[];
    stateOptions: FacilityEnumeration[];
    countryOptions: FacilityEnumeration[];
  };
};

export type FacilityEnumeration = {
  name: string;
  value: string;
};

export type FacilitySearchLabels = {
  labels?: {
    searchByLabel: string;
    zipCityLabel: string;
    zipCityErrorLabel: string;
    stateTerritoryLabel: string;
    countryLabel: string;
    facilityNameLabel: string;
    facilityErrorLabel: string;
    withinLabel: string;
    modalityLabel: string;
    designationLabel: string;
    resultsFoundLabel: string;
    searchButtonLabel: string;
    noResultsFoundLabel: string;
    accreditedLabel: string;
    inProgressLabel: string;
    modalitiesOfferedLabel: string;
    viewMapLabel: string;
    getDirectionsLabel: string;
  };
};

export type FacilitySearchFields = {
  fields: {
    searchOptions: ACREnumeration[];
    modalityOptions: ACREnumeration[];
    designationOptions: ACREnumeration[];
    milesOptions: ACREnumeration[];
    stateOptions: ReferenceField;
    countryOptions: ReferenceField;
  };
};

export type FacilitySearchStateEnumGraphQL = {
  name: string;
  value: { value: string };
};

export type FacilitySearchDataModel = FacilitySearchFields & ComponentRendering;
