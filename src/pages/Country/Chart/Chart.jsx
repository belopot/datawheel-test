import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {Treemap} from 'd3plus-react';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

import {tradeDataRequest} from 'api/trade';
import {Years} from 'dataset/years';
import {useStore} from 'state/store';
import Loader from 'components/Loader';
import {H3} from 'components/Labels';
import {device} from 'theme/device';

export default function Chart() {
  const navigate = useNavigate();
  const {countryId} = useParams();

  const currentCountry = useStore(state => state.currentCountry);

  const [chartData, setChartData] = useState(null);
  const [year, setYear] = useState(2020);

  const {mutate, isLoading} = useMutation(tradeDataRequest, {
    onSuccess: data => {
      setChartData(data);
    },
  });

  useEffect(() => {
    if (countryId) {
      mutate([countryId, year]);
    }
  }, [countryId, year]);

  if (isLoading) {
    return (
      <div className="mt-4">
        <Loader label="Loading trade data" />
      </div>
    );
  }

  if (!chartData) {
    return <>No data</>;
  }

  // Data type
  // {HS2 ID: 101, HS2: 'Live animals', Trade Value: 50707}

  return (
    <Holder>
      {currentCountry && (
        <CountryBar className="mb-2 flex w-full align-items-center justify-content-between">
          <H3>{currentCountry['EN Label']}</H3>
          <Button
            label="Back"
            onClick={() => {
              //Back
              navigate(-1);
            }}
          />
        </CountryBar>
      )}
      <div>
        <Dropdown
          value={year}
          onChange={e => setYear(e.value)}
          options={Years}
          placeholder="Select a year"
          className="w-full"
        />
      </div>
      {!Number.isNaN(chartData.importsPercent) &&
        !Number.isNaN(chartData.exportsPercent) && (
          <Summary>{`In ${year}, imports ${
            chartData.importsPercent > 100
              ? 'increased'
              : chartData.importsPercent === 100
              ? 'is same'
              : 'decreased'
          } ${chartData.importsPercent === 100 ? 'as' : 'by'} ${
            chartData.importsPercent
          }% and exports ${
            chartData.exportsPercent > 100
              ? 'increased'
              : chartData.exportsPercent === 100
              ? 'is same'
              : 'decreased'
          } ${chartData.exportsPercent === 100 ? 'as' : 'by'} ${
            chartData.exportsPercent
          }% compared to ${year - 1}.`}</Summary>
        )}

      <ChartHolder>
        <H3>Exports</H3>
        <Treemap
          config={{
            data: chartData.exports,
            groupBy: ['HS2'],
            sum: 'Trade Value',
          }}
        />
      </ChartHolder>
      <ChartHolder>
        <H3>Imports</H3>
        <Treemap
          config={{
            data: chartData.imports,
            groupBy: ['HS2'],
            sum: 'Trade Value',
          }}
        />
      </ChartHolder>
    </Holder>
  );
}

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-bottom: 5em;
`;

const CountryBar = styled.div`
  background-color: white;
  padding: 0.5em 1em;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.15));
`;

const ChartHolder = styled.div`
  width: 100%;
  padding: 1em;
  min-height: 30vh;
  background-color: white;
  overflow: hidden;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.15));
  @media ${device.pad} {
    min-height: 300px;
  }
`;

const Summary = styled.div`
  width: 100%;
  user-select: all;
  font-size: 1.3em;
`;
