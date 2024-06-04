import { useContext } from 'react';
import { FacilitySearchContext } from './FaciltySearch.context';
import { FacilitySearchSealGraphQL } from './FacilitySearch.props';

import { findSum } from './FacilitySearch.util';

import { Grid, Text } from '@radix-ui/themes';
import { ButtonStyle } from 'src/enumerations/ButtonStyle.enum';
import LinkBase from '../Link/LinkBase';

import * as constants from './FacilitySearch.dictionary';

import cn from 'classnames';

export type FacilitySearchResultType = {
  accreditAcronym: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  expDate: string;
  accStatus: string;
  mod: string;
  modalities: string;
  mamFlag: string;
  lat: string;
  lng: string;
  mrpcFlage: string;
};

type FacilitySearchResultProps = {
  result: FacilitySearchResultType;
  index: number;
};

type FacilitySearchSeal = {
  id: string;
  imageSrc: string;
};

const FacilitySearchResult = (props: FacilitySearchResultProps): JSX.Element => {
  const { result, index } = props;

  const isAccredited = result?.accStatus === 'A';
  const isInProgress = result?.accStatus === 'U';

  const { labels, seals, setActiveLocation } = useContext(FacilitySearchContext);

  const getSealImages = (): FacilitySearchSeal[] => {
    const images: FacilitySearchSeal[] = [];

    const getSeal = (id: string): FacilitySearchSealGraphQL | undefined => {
      return seals?.find((seal) => seal?.code?.value === id);
    };

    if (result?.mrpcFlage === '1') {
      const mrpcSeal = getSeal(constants.MRPC);

      if (mrpcSeal) {
        images.push({
          id: mrpcSeal?.code?.value?.toLowerCase(),
          imageSrc: mrpcSeal?.sealImage?.jsonValue?.value?.src ?? '',
        });
      }
    }

    // API returns a singular bit value from which we would need to calculate the breakdown to
    // determine which seals to render

    const mamFlagValues = [1, 2, 4, 8];

    const mamFlagIndices = findSum(mamFlagValues, Number(result?.mamFlag));

    mamFlagIndices?.forEach((flag) => {
      let mamSeal;

      switch (flag) {
        case 1:
          mamSeal = getSeal(constants.BIOCOE);
          break;
        case 2:
          mamSeal = getSeal(constants.DICOE);
          break;
        case 4:
          mamSeal = getSeal(constants.IMAGE_GENTLY);
          break;
        case 8:
          mamSeal = getSeal(constants.LCSD);
          break;
      }

      images.push({
        id: mamSeal?.code?.value?.toLowerCase() ?? '',
        imageSrc: mamSeal?.sealImage?.jsonValue?.value?.src ?? '',
      });
    });

    return images;
  };

  return (
    <Grid
      data-ref="facility-search-result"
      className="grid-cols-1 gap-x-[30px] gap-y-6 border-b-[1px] border-t-body py-6 md:grid-cols-2 md:gap-y-[20px] md:py-12 lg:grid-cols-4"
    >
      <div
        className={cn('w-fit rounded-[4px] px-3 py-1 font-medium text-white', {
          'bg-purple-100': isAccredited,
          'bg-green-50': isInProgress,
        })}
      >
        {isAccredited ? labels?.accreditedLabel : labels?.inProgressLabel}
      </div>
      <Text as="p" className="title-b md:title-c col-start-1">
        {index + 1}) {result?.name}
      </Text>
      <div className="col-start-1 md:col-start-2">
        {result?.modalities && (
          <>
            <Text as="p" className="sub-heading-b mb-2">
              {labels?.modalitiesOfferedLabel}
            </Text>
            <Text as="p" className="body-sm">
              {result?.modalities}
            </Text>
          </>
        )}
      </div>
      <div className="body-sm col-start-1 md:col-start-1 lg:col-start-3">
        <p>{result?.address}</p>
        <p>
          {result?.city}, {result?.state} {result?.zip}
        </p>
        <p>{result?.phone}</p>
      </div>
      <div className="col-start-1 flex flex-wrap gap-[10px] md:col-start-2 lg:col-start-4 lg:justify-center">
        {getSealImages()?.map((image, index) => (
          <a key={index} href={`#${image.id}`} className="h-max max-w-[75px]">
            <img src={image.imageSrc} alt="" />
          </a>
        ))}
      </div>
      <div className="col-start-1 flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-start lg:col-start-5 lg:items-center">
        <button
          className="button font-medium"
          onClick={() => setActiveLocation({ index, info: result })}
        >
          {labels?.viewMapLabel}
        </button>
        <LinkBase
          link={{
            value: {
              href: `https://www.google.com/maps/dir/?api=1&destination=${result?.lat},${result?.lng}`,
              text: labels?.getDirectionsLabel,
              target: '__blank',
            },
          }}
          style={ButtonStyle.CTA}
        />
      </div>
    </Grid>
  );
};

export default FacilitySearchResult;
