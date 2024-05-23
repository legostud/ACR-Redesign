import { Grid, Text } from '@radix-ui/themes';

import { ButtonStyle } from 'src/enumerations/ButtonStyle.enum';
import LinkBase from '../Link/LinkBase';

import cn from 'classnames';

export type SearchResultType = {
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
  result: SearchResultType;
};

const FacilitySearchResult = (props: FacilitySearchResultProps) => {
  const { result } = props;

  const isAccredited = result?.accStatus === 'A';
  const isInProgress = result?.accStatus === 'U';

  return (
    <Grid className="grid-cols-1 gap-x-[30px] gap-y-[20px] border-b-[1px] border-t-body py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div
        className={cn('w-fit rounded-[4px] px-3 py-1 text-white', {
          'bg-purple-100': isAccredited,
          'bg-green-50': isInProgress,
        })}
      >
        {isAccredited ? 'Accredited' : 'In Progress'}
      </div>
      <Text as="p" className="title-b md:title-c col-start-1">
        {result?.name}
      </Text>
      <div className="col-start-1 md:col-start-2">
        <Text as="p" className="sub-heading-b mb-2">
          {/* TODO - Dictionary */}
          Modalities Offered:
        </Text>
        <Text as="p" className="body-sm">
          {result?.modalities}
        </Text>
      </div>
      <div className="body-sm col-start-1 sm:col-start-1 lg:col-start-3">
        <p>{result?.address}</p>
        <p>
          {result?.city}, {result?.state} {result?.zip}
        </p>
        <p>{result?.phone}</p>
      </div>
      <div className="col-start-1 sm:col-start-2 lg:col-start-4">
        {/* TODO - Get Seals */}
        <a href="/">
          {result?.mamFlag !== '0'
            ? result?.mamFlag
            : result?.mrpcFlage === '1'
              ? result?.mrpcFlage
              : ''}
        </a>
      </div>
      <div className="col-start-1 flex justify-between gap-4 md:flex-col lg:col-start-5">
        <button className="button">
          {/* TODO - Dictionary */}
          View on Map
        </button>
        <LinkBase link={{ value: { href: '/', text: 'Get Directions' } }} style={ButtonStyle.CTA} />
      </div>
    </Grid>
  );
};

export default FacilitySearchResult;

