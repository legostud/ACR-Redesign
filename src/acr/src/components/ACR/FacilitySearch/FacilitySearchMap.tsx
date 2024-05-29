import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FacilitySearchContext } from './FaciltySearch.context';
import { FacilitySearchResultType } from './FacilitySearchResult';

import { ButtonStyle } from 'src/enumerations/ButtonStyle.enum';
import { IconName } from 'src/enumerations/Icon.enum';

import { Flex } from '@radix-ui/themes';
import LinkBase from '../Link/LinkBase';
import Icon from '../Icon/Icon';

import { GoogleMap, OverlayView, OverlayViewF, InfoWindowF } from '@react-google-maps/api';

export type FacilitySearchResultMarker = {
  index: number;
  info: FacilitySearchResultType;
};

const FacilitySearchMap = (): JSX.Element => {
  const { isApiLoaded, searchResults, activeLocation } = useContext(FacilitySearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<FacilitySearchResultMarker | null>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Pan and zoom map to fit the bounds
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      searchResults.map((marker) => {
        bounds.extend({
          lat: Number(marker.lat),
          lng: Number(marker.lng),
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, searchResults]);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle "View on Map" logic
    if (activeLocation && mapRef?.current) {
      const headerOffset = 45;
      const elementPosition = mapRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      handleMarkerClick(activeLocation?.index, activeLocation?.info);
    }
  }, [activeLocation]);

  if (!isApiLoaded || searchResults?.length === 0) {
    return <></>;
  }

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const handleMarkerClick = (index: number, info: FacilitySearchResultType) => {
    setInfoWindowData({ index, info });
    setIsOpen(true);
  };

  return (
    <div data-ref="facility-search-map" ref={mapRef} className="my-12 h-[340px] w-full">
      <GoogleMap mapContainerStyle={containerStyle} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
        {searchResults.map((result, index) => (
          <OverlayViewF
            key={index}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            position={{
              lat: Number(result.lat),
              lng: Number(result.lng),
            }}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -height / 2,
            })}
          >
            <button
              className="relative"
              onClick={() => {
                handleMarkerClick(index, result);
              }}
            >
              <div className="absolute -top-10 left-[-12px] h-6 w-6 rounded-[50%] bg-indigo-100 text-white after:absolute after:bottom-[-22px] after:left-[2px] after:h-0 after:w-0 after:border-[10px] after:border-t-[17px] after:border-solid after:border-transparent after:border-t-indigo-100 after:content-['']">
                <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px] font-medium">
                  {index + 1}
                </span>
              </div>
            </button>
            {isOpen && infoWindowData?.index === index && (
              <>
                <InfoWindowF
                  position={{
                    lat: Number(infoWindowData?.info?.lat),
                    lng: Number(infoWindowData?.info?.lng),
                  }}
                >
                  <>
                    <div className="body-xs relative bg-indigo-100 px-[30px] py-6 text-white">
                      {index + 1}) {infoWindowData?.info?.name}
                      <button
                        type="button"
                        aria-label="Close"
                        className="absolute right-2 top-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon iconName={IconName.CLOSE} />
                      </button>
                    </div>
                    <Flex direction="column" gap="2" className="px-[30px] py-6 pt-4">
                      <div>
                        <p className="body-xs">{infoWindowData?.info?.address}</p>
                        <p className="body-xs">
                          {infoWindowData?.info?.city}, {infoWindowData?.info?.state}{' '}
                          {infoWindowData?.info?.zip}
                        </p>
                      </div>
                      <LinkBase
                        link={{
                          value: {
                            href: `https://www.google.com/maps/dir/?api=1&destination=${infoWindowData?.info?.lat},${infoWindowData?.info?.lng}`,
                            text: 'Get Directions',
                            target: '__blank',
                          },
                        }}
                        style={ButtonStyle.CTA}
                      />
                    </Flex>
                  </>
                </InfoWindowF>
              </>
            )}
          </OverlayViewF>
        ))}
      </GoogleMap>
    </div>
  );
};

export default FacilitySearchMap;
