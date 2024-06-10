import { useMemo, useRef, useState } from 'react';
import { useCombobox } from 'downshift';
import Input, { InputProps } from './Input';
import { Flex } from '@radix-ui/themes';

import cn from 'classnames';

type SearchBoxProps = Omit<InputProps, 'onChange'> & {
  onChange?: (selectedItem: { lat: number | null; lng: number | null } | null) => void;
};

type AutocompleteSuggestions = {
  id: string;
  name: {
    string: string;
    length: number;
    offset: number;
  };
  address: {
    string: string;
    length: number;
    offset: number;
  };
};

function boldUserText({
  length,
  offset,
  string,
}: {
  length: number;
  offset: number;
  string: string;
}) {
  if (length === 0 && offset === 0) {
    return string;
  }

  const userText = string.substring(offset, offset + length);
  const stringBefore = string.substring(0, offset);
  const stringAfter = string.substring(offset + length);
  return `${stringBefore}<b>${userText}</b>${stringAfter}`;
}

/**
 * Search Box
 * @param props
 * @returns Google Maps API accessible autocomplete search
 */
const SearchBox = (props: SearchBoxProps) => {
  const { label, name, id, onChange, ...rest } = props;
  const [searchResult, setSearchResult] = useState<{
    autocompleteSuggestions: AutocompleteSuggestions[];
    status: string;
  }>({
    autocompleteSuggestions: [],
    status: '',
  });

  const searchBoxRef = useRef<HTMLDivElement>(null);

  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  const geocoder = new google.maps.Geocoder();

  const sessionToken = useMemo(
    () => new google.maps.places.AutocompleteSessionToken(),
    [google.maps.places.AutocompleteSessionToken]
  );

  const { isOpen, getInputProps, getItemProps, getMenuProps, highlightedIndex } = useCombobox({
    items: searchResult.autocompleteSuggestions,
    itemToString(item) {
      return item ? `${item.name?.string} ${item.address?.string}` : '';
    },
    onSelectedItemChange: ({ selectedItem }) => {
      geocoder.geocode(
        { address: `${selectedItem?.name?.string} ${selectedItem?.address?.string}` },
        (results) => {
          onChange &&
            selectedItem !== undefined &&
            onChange({
              lat: results?.[0]?.geometry?.location?.lat() ?? null,
              lng: results?.[0]?.geometry?.location?.lng() ?? null,
            });
          return;
        }
      );
    },
    onInputValueChange: ({ inputValue }) => {
      // Remove search suggestions when the search term is deleted in search box
      if (inputValue === '') {
        setSearchResult({
          autocompleteSuggestions: [],
          status: '',
        });
        return;
      }
      // Make an API call to Google Maps server
      service.getPlacePredictions(
        {
          input: inputValue,
          sessionToken: sessionToken,
        },
        handlePredictions
      );
      // Process the response from Google Maps server
      function handlePredictions(
        predictions: google.maps.places.AutocompletePrediction[],
        status: google.maps.places.PlacesServiceStatus
      ) {
        if (status === 'OK') {
          const autocompleteSuggestions = predictions.map((prediction) => {
            return {
              id: prediction?.place_id,
              name: {
                string: prediction?.structured_formatting?.main_text,
                // To highlight the search term in suggested place names
                length:
                  prediction?.structured_formatting?.main_text_matched_substrings?.[0]['length'],
                offset:
                  prediction?.structured_formatting?.main_text_matched_substrings?.[0]['offset'],
              },
              address: {
                string: prediction?.structured_formatting?.secondary_text,
                // To highlight the search term in suggested place address
                length:
                  prediction?.structured_formatting?.main_text_matched_substrings?.[0]['length'],
                offset:
                  prediction?.structured_formatting?.main_text_matched_substrings?.[0]['offset'],
              },
            };
          });
          // Update UI with new search suggestions
          setSearchResult({
            autocompleteSuggestions: autocompleteSuggestions,
            status: 'OK',
          });
        } else {
          setSearchResult({
            autocompleteSuggestions: [],
            status: status,
          });
        }
      }
    },
  });

  return (
    <Flex data-ref="search-box" ref={searchBoxRef} direction="column" gap="2" className="relative">
      <Input
        label={label}
        id={id}
        name={name}
        inputClassName={cn('w-full', {
          'rounded-b-none': isOpen,
        })}
        type="search"
        {...rest}
        {...getInputProps()}
      />
      <ul
        className={cn(
          'absolute top-full z-10 max-h-96 w-full overflow-y-auto rounded-md rounded-b-[8px] border-[1px] border-t-0 border-indigo-100 bg-white ',
          { hidden: !(isOpen && searchResult.autocompleteSuggestions.length) },
          { 'rounded-t-none': isOpen }
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          searchResult.autocompleteSuggestions.map((item, index) => {
            return (
              <li
                key={index}
                className={cn('body-sm cursor-pointer px-[15px] py-[10px]', {
                  'bg-gray-20': highlightedIndex === index,
                })}
                {...getItemProps({ item, index })}
              >
                <div
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html: `${boldUserText(item.name)} ${item.address?.string}`,
                  }}
                />
              </li>
            );
          })}
      </ul>
    </Flex>
  );
};

export default SearchBox;
