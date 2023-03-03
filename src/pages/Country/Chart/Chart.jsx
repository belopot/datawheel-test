import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {Button} from 'primereact/button';
import {Treemap} from 'd3plus-react';

import {chartDataRequest} from 'api/chart';
import {useStore} from 'state/store';
import Loader from 'components/Loader';
import {H2, H3} from 'components/Labels';

export default function Chart() {
  const navigate = useNavigate();
  const {countryId} = useParams();

  const currentCountry = useStore(state => state.currentCountry);

  const [chartData, setChartData] = useState();

  const {mutate, isLoading} = useMutation(chartDataRequest, {
    onSuccess: data => {
      setChartData(data);
    },
  });

  useEffect(() => {
    if (countryId) {
      mutate(countryId);
    }
  }, [countryId]);

  if (isLoading) {
    return (
      <div className="mt-4">
        <Loader label="Loading trade data" />
      </div>
    );
  }

  if (chartData === undefined) {
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
        <H3>Exports</H3>
        <Treemap
          config={{
            data: chartData.exports,
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
  min-height: 500px;
  padding: 1em;
  background-color: white;
  overflow: hidden;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.15));
`;
