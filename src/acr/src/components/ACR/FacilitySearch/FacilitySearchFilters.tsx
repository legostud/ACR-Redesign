import { useContext, useEffect, useRef } from 'react';

import { FacilitySearchProps } from './FacilitySearch.props';
import { FacilitySearchType } from './FacilitySearch.enum';
import { FacilitySearchContext } from './FaciltySearch.context';

import { Flex } from '@radix-ui/themes';
import Radio from '../Inputs/Radio';
import Select, { SelectItem } from '../Inputs/Select';
import Input from '../Inputs/Input';

const FacilitySearchFilters = (props: FacilitySearchProps): JSX.Element => {
  const { externalFields } = props;

  const { stateOptions, countryOptions, milesOptions, modalityOptions, designationOptions } =
    externalFields ?? {};

  const { isApiLoaded, searchType, search, labels, errors, setSearchParams, setSearchType } =
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

  const isZipCitySearch = searchType === FacilitySearchType.ZIPCITY;
  const isStateSearch = searchType === FacilitySearchType.STATE;
  const isCountrySearch = searchType === FacilitySearchType.COUNTRY;
  const isFacilitySearch = searchType === FacilitySearchType.FACILITY;

  useEffect(() => {
    // Set default search params
    if (isZipCitySearch) {
      setSearchParams({ searchRadius: milesOptions?.[0]?.value });
    } else if (isStateSearch) {
      setSearchParams({ stateCountry: stateOptions?.[0]?.value });
    } else if (isCountrySearch) {
      setSearchParams({ stateCountry: countryOptions?.[0]?.value });
    }
  }, [
    isZipCitySearch,
    isStateSearch,
    isCountrySearch,
    milesOptions,
    stateOptions,
    countryOptions,
    setSearchParams,
  ]);

  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isApiLoaded && searchType && autocompleteInputRef?.current) {
      const autoComplete = new window.google.maps.places.Autocomplete(
        autocompleteInputRef?.current
      );

      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();

        if (!place?.geometry || !place?.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          setSearchParams((prev) => ({ ...prev, lat: null, lng: null }));
        }

        if (place?.geometry?.viewport || place?.geometry?.location) {
          const location = place.geometry.location;

          if (location?.lat() && location?.lng()) {
            setSearchParams((prev) => ({
              ...prev,
              latitude: `${location?.lat()}`,
              longitude: `${location?.lng()}`,
            }));
          }
        }
      });
    }
  }, [isApiLoaded, autocompleteInputRef, searchType, setSearchParams]);

  // Error Handling
  useEffect(() => {
    Object.keys(errors)?.map((err) => {
      const errorField = document.querySelector(`#${err}`) as HTMLInputElement;
      errorField && errorField?.focus();
    });
  }, [errors]);

  return (
    <div data-ref="facility-search-filters" id="fs-filters" tabIndex={-1}>
      <Flex gap="5" asChild direction={{ initial: 'column' }} className="md:flex-row">
        <fieldset className="mb-8 md:mb-12">
          <legend className="title-c mb-6">{searchByLabel}</legend>

          <Radio
            name="searchBy"
            value={FacilitySearchType.ZIPCITY}
            defaultChecked
            label={zipCityLabel}
            onChange={(e) => setSearchType(e.target.value)}
          />

          <Radio
            name="searchBy"
            value={FacilitySearchType.STATE}
            label={stateTerritoryLabel}
            onChange={(e) => setSearchType(e.target.value)}
          />

          <Radio
            name="searchBy"
            value={FacilitySearchType.COUNTRY}
            label={countryLabel}
            onChange={(e) => setSearchType(e.target.value)}
          />

          <Radio
            name="searchBy"
            value={FacilitySearchType.FACILITY}
            label={facilityNameLabel}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </fieldset>
      </Flex>

      <Flex
        direction={{ initial: 'column' }}
        className="gap-6 md:flex-row md:items-stretch md:gap-[30px]"
      >
        {isZipCitySearch ? (
          <div className="relative grow-0 basis-[calc(25%-30px)] md:max-w-[240px]">
            <Input
              id="zipCity"
              ref={autocompleteInputRef}
              name={zipCityLabel}
              label={zipCityLabel}
              className="w-full"
              aria-describedby="zipCityErr"
              aria-invalid={errors['zipCity'] ? true : false}
              onChange={() =>
                setSearchParams((prev) => ({ ...prev, latitude: null, longitude: null }))
              }
            />
            <div className="relative" aria-live="polite">
              {errors['zipCity'] && (
                <span
                  id="zipCityErr"
                  aria-live="polite"
                  className="absolute mt-1 text-[14px] text-red-25"
                >
                  {errors['zipCity']}
                </span>
              )}
            </div>
          </div>
        ) : isFacilitySearch ? (
          <div className="relative grow-0 basis-[calc(25%-30px)] md:max-w-[240px]">
            <Input
              name={facilityNameLabel}
              label={facilityNameLabel}
              className="w-full"
              aria-describedby="facilityErr"
              aria-invalid={errors['facility'] ? true : false}
              onChange={(e) =>
                setSearchParams((prev) => ({ ...prev, facilityName: e?.target?.value }))
              }
            />
            <div className="relative" aria-live="polite">
              {errors['facility'] && (
                <span
                  id="facilityErr"
                  aria-live="polite"
                  className="absolute mt-1 text-[14px] text-red-25"
                >
                  {errors['facility']}
                </span>
              )}
            </div>
          </div>
        ) : (
          <Select
            className="w-full grow-0 basis-[calc(25%-30px)] md:max-w-[240px]"
            placeholder="Select"
            label={isStateSearch ? stateTerritoryLabel : countryLabel}
            defaultSelectedItem={
              isStateSearch
                ? ({
                    value: stateOptions?.sort((a, b) => a.name.localeCompare(b.name))?.[0]?.value,
                    label: stateOptions?.sort((a, b) => a.name.localeCompare(b.name))?.[0]?.name,
                  } as SelectItem)
                : ({
                    value: countryOptions?.sort((a, b) => a.name.localeCompare(b.name))?.[0]?.value,
                    label: countryOptions?.sort((a, b) => a.name.localeCompare(b.name))?.[0]?.name,
                  } as SelectItem)
            }
            items={
              (isStateSearch ? stateOptions : countryOptions)
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((r) => ({ value: r.value, label: r.name })) ?? []
            }
            onChange={(v) =>
              setSearchParams((prev) => ({
                ...prev,
                stateCountry: v?.value,
              }))
            }
          />
        )}

        <Select
          className="w-full grow-0 basis-[calc(25%-30px)] md:max-w-[240px]"
          placeholder="Select"
          label={withinLabel}
          disabled={!isZipCitySearch}
          items={milesOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
          onChange={(v) => setSearchParams((prev) => ({ ...prev, searchRadius: v?.value }))}
          defaultSelectedItem={
            {
              value: milesOptions?.[0]?.value,
              label: milesOptions?.[0]?.name,
            } as SelectItem
          }
        />

        <Select
          className="w-full grow-0 basis-[calc(25%-30px)] md:max-w-[240px]"
          placeholder="Select"
          label={modalityLabel}
          items={modalityOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
          onChange={(v) => setSearchParams((prev) => ({ ...prev, modality: v?.value }))}
        />

        <Select
          className="w-full grow-0 basis-[calc(25%-30px)] md:max-w-[240px]"
          placeholder="Select"
          label={designationLabel}
          items={designationOptions?.map((r) => ({ value: r.value, label: r.name })) ?? []}
          onChange={(v) => setSearchParams((prev) => ({ ...prev, designation: v?.value }))}
        />

        <button
          type="button"
          className="button mt-2 self-start px-5 py-4 !font-medium md:mt-8"
          onClick={search}
        >
          {searchButtonLabel}
        </button>
      </Flex>
    </div>
  );
};

export default FacilitySearchFilters;
