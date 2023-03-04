import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';

import {allCountriesRequest} from 'api/country';
import {Years} from 'dataset/years';
import {useStore} from 'state/store';

import PageTransition from 'components/PageTransition';
import {MiddleContainer} from 'components/Containers';
import WaveText from 'components/WaveText';
import {H2, H3} from 'components/Labels';
import {device} from 'theme/device';

export default function Country() {
  const {countryId} = useParams();
  const navigate = useNavigate();

  // Country data
  const {data, isLoading} = useQuery({
    queryKey: ['allCountriessRequest'],
    queryFn: allCountriesRequest,
  });

  const currentCountry = useStore(state => state.currentCountry);
  const setCurrentCountry = useStore(state => state.setCurrentCountry);

  const currentYear = useStore(state => state.currentYear);
  const setCurrentYear = useStore(state => state.setCurrentYear);

  useEffect(() => {
    if (countryId) {
      const newCountry = data?.find(d => d['ID'] === countryId);
      if (newCountry) {
        setCurrentCountry(newCountry);
      }
    } else {
      setCurrentCountry(null);
    }
  }, [data, countryId]);

  return (
    <PageTransition>
      <Holder>
        <MiddleContainer>
          <H2 className="mb-2">
            <WaveText
              text="National Trade Data"
              replay={true}
              delay={0.3}
              duration={0.02}
            />
          </H2>
          {currentCountry ? (
            <CountryBar className="mb-5 flex w-full align-items-center justify-content-between flex-wrap gap-2 scalein animation-duration-300">
              <div className="flex align-items-center gap-3">
                <CountryName>{currentCountry['EN Label']}</CountryName>
                <Dropdown
                  value={currentYear}
                  onChange={e => setCurrentYear(e.value)}
                  options={Years}
                  placeholder="Select a year"
                />
              </div>
              <Button
                label="Back"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </CountryBar>
          ) : (
            <H3>Select a country in Search page</H3>
          )}
          <Outlet />
        </MiddleContainer>
      </Holder>
    </PageTransition>
  );
}

const Holder = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: aliceblue;
  padding-top: 10em;
`;

const CountryBar = styled.div`
  background-color: white;
  padding: 0.5em 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CountryName = styled.div`
  font-size: 1.3em;
  border-radius: 5px;
  color: white;
  background-color: #f75151;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
  @media ${device.mobileL} {
    font-size: 1em;
  }
`;
