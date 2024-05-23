import { useContext, useEffect } from 'react';

import { FacilitySearchProps } from './FacilitySearch.props';
import { FacilitySearchType } from './FacilitySearch.enum';
import { FacilitySearchContext } from './FaciltySearch.context';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';

import { Flex } from '@radix-ui/themes';
import Radio from '../Inputs/Radio';
import Select, { SelectItem } from '../Inputs/Select';
import Input from '../Inputs/Input';

const FacilitySearchFilters = (props: FacilitySearchProps) => {
  const { externalFields } = props;
  const { stateOptions, countryOptions, milesOptions, modalityOptions, designationOptions } =
    externalFields ?? {};

  const { searchType, search, labels, errors, setSearchParams, setSearchType } =
    useContext(FacilitySearchContext);

  const {
    searchByLabel,
    searchButtonLabel,
    zipCityLabel,
    stateTerritoryLabel,
    countryLabel,
    facilityNameLabel,
    withinLabel,
    modalityLabel,
    designationLabel,
  } = labels ?? {};

  useEffect(() => {
    // Set default search params
    if (searchType === FacilitySearchType.STATE) {
      setSearchParams({ state: stateOptions?.[0]?.value });
    } else if (searchType === FacilitySearchType.COUNTRY) {
      setSearchParams({ country: countryOptions?.[0]?.value });
    }
  }, [searchType]);

  return (
    <div data-ref="facility-search-filters">
      <Flex gap="5" asChild direction={{ initial: 'column', md: 'row' }}>
        <fieldset className="mb-8 md:mb-12">
          <legend className="title-c mb-6">
            <Text field={searchByLabel} />
          </legend>
          <Radio
            name="searchBy"
            value={FacilitySearchType.ZIP}
            defaultChecked
            label={zipCityLabel?.value}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <Radio
            name="searchBy"
            value={FacilitySearchType.STATE}
            label={stateTerritoryLabel?.value}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <Radio
            name="searchBy"
            value={FacilitySearchType.COUNTRY}
            label={countryLabel?.value}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <Radio
            name="searchBy"
            value={FacilitySearchType.FACILITY}
            label={facilityNameLabel?.value}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </fieldset>
      </Flex>

      <Flex
        className="gap-6 md:items-stretch md:gap-[30px]"
        direction={{ initial: 'column', md: 'row' }}
      >
        {searchType === FacilitySearchType.ZIP ? (
          <div className="relative basis-1/4">
            <Input label={zipCityLabel?.value} className="w-full" />
            {errors['zip'] && (
              <span className="absolute mt-1 text-[12px] text-red-100">{errors['zip']}</span>
            )}
          </div>
        ) : searchType === FacilitySearchType.FACILITY ? (
          <div className="relative basis-1/4">
            <Input
              label={facilityNameLabel?.value}
              className="w-full"
              onChange={(e) =>
                setSearchParams((prev: any) => ({ ...prev, facility: e?.target?.value }))
              }
            />
            {errors['facility'] && (
              <span className="absolute mt-1 text-[12px] text-red-100">{errors['facility']}</span>
            )}
          </div>
        ) : (
          <Select
            className="w-full basis-1/4"
            placeholder="Select"
            label={
              searchType === FacilitySearchType.STATE
                ? stateTerritoryLabel?.value
                : countryLabel?.value
            }
            defaultSelectedItem={
              searchType === FacilitySearchType.STATE
                ? ({
                    value: stateOptions?.[0]?.value,
                    label: stateOptions?.[0]?.name,
                  } as SelectItem)
                : ({
                    value: countryOptions?.[0]?.value,
                    label: countryOptions?.[0]?.name,
                  } as SelectItem)
            }
            items={
              (searchType === FacilitySearchType.STATE ? stateOptions : countryOptions)
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((r) => ({ value: r.value, label: r.name })) ?? []
            }
            onChange={(v) =>
              setSearchParams((prev: any) => ({
                ...prev,
                [searchType === FacilitySearchType.STATE ? 'state' : 'country']: v?.value,
              }))
            }
          />
        )}
        <Select
          className="w-full basis-1/4"
          placeholder="Select"
          label={withinLabel?.value}
          disabled={searchType !== FacilitySearchType.ZIP}
          items={milesOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
        />
        <Select
          className="w-full basis-1/4"
          placeholder="Select"
          label={modalityLabel?.value}
          items={modalityOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
          onChange={(v) => setSearchParams((prev: any) => ({ ...prev, modality: v?.value }))}
        />
        <Select
          className="w-full basis-1/4"
          placeholder="Select"
          label={designationLabel?.value}
          items={designationOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
          onChange={(v) => setSearchParams((prev: any) => ({ ...prev, designation: v?.value }))}
        />
        <button
          type="button"
          className="button mt-2 px-5 py-4 !font-medium md:mt-8"
          onClick={search}
        >
          <Text field={searchButtonLabel} />
        </button>
      </Flex>
    </div>
  );
};

export default FacilitySearchFilters;

