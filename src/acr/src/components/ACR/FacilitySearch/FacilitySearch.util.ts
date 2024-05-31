import { ComponentRendering } from '@sitecore-jss/sitecore-jss-react';
import {
  FacilityEnumeration,
  FacilitySearchData,
  FacilitySearchDataModel,
  FacilitySearchSealGraphQL,
  FacilitySearchStateEnumGraphQL,
} from 'components/ACR/FacilitySearch/FacilitySearch.props';
import { ACREnumeration } from 'src/types/enum.props';
import { GqlResult, getACRGraphQlClient } from 'src/utils/acrGraphQlClient';
import { getSealsQuery, getStateCountryQuery } from './FacilitySearch.string';

export type StateRequest = {
  language?: string;
  isPageEditing: boolean;
};
export const getStaticPropsForFacilitySearch = async (
  rendering: ComponentRendering,
  request: StateRequest
): Promise<FacilitySearchData> => {
  const data = rendering as FacilitySearchDataModel;
  const transformToFacilityEnumeration = (
    item: ACREnumeration | FacilitySearchStateEnumGraphQL
  ) => {
    const model: FacilityEnumeration = {
      name: item.name,
      value: '',
    };
    if ('fields' in item) {
      const m = item as ACREnumeration;
      model.value = m?.fields?.Value?.value ?? '';
    } else {
      const m = item as FacilitySearchStateEnumGraphQL;
      model.value = m?.value?.value ?? '';
    }
    return model;
  };
  const stateQuery = getStateCountryQuery(data?.fields?.stateOptions?.id, request.language);
  const result =
    await getACRGraphQlClient().request<GqlResult<FacilitySearchStateEnumGraphQL[]>>(stateQuery);

  const countryQuery = getStateCountryQuery(data?.fields?.countryOptions?.id, request.language);
  const countryResult =
    await getACRGraphQlClient().request<GqlResult<FacilitySearchStateEnumGraphQL[]>>(countryQuery);

  const sealQuery = getSealsQuery(request.language);
  const sealResult =
    await getACRGraphQlClient().request<GqlResult<FacilitySearchSealGraphQL[]>>(sealQuery);

  const model: FacilitySearchData = {
    externalFields: {
      searchOptions: data?.fields?.searchOptions?.map(transformToFacilityEnumeration) ?? [],
      designationOptions:
        data?.fields?.designationOptions?.map(transformToFacilityEnumeration) ?? [],
      milesOptions: data?.fields?.milesOptions?.map(transformToFacilityEnumeration) ?? [],
      modalityOptions: data?.fields?.modalityOptions?.map(transformToFacilityEnumeration) ?? [],
      stateOptions: result?.search?.results?.map(transformToFacilityEnumeration) ?? [],
      countryOptions: countryResult?.search?.results?.map(transformToFacilityEnumeration) ?? [],
      seals: sealResult?.search?.results ?? [],
    },
  };

  return model;
};

export const findSum = (numbers: number[], targetSum: number): number[] => {
  const powerset = (arr: number[]) => {
    const ps = [[]] as number[][];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = ps.length; j < len; j++) {
        ps.push(ps[j].concat(arr[i]));
      }
    }

    return ps;
  };

  const sum = (arr: number[]) => {
    return arr.reduce((total, num) => total + num, 0);
  };

  const numberSets = powerset(numbers);

  for (let i = 0; i < numberSets.length; i++) {
    const numberSet = numberSets[i];
    if (sum(numberSet) == targetSum) return numberSet;
  }

  return [];
};
