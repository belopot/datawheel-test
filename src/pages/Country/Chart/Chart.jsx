import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {Treemap} from 'd3plus-react';

import {tradeDataRequest} from 'api/trade';
import {useStore} from 'state/store';
import {device} from 'theme/device';
import Loader from 'components/Loader';
import {H3} from 'components/Labels';

export default function Chart() {
  const {countryId} = useParams();

  const currentYear = useStore(state => state.currentYear);

  const [chartData, setChartData] = useState(null);

  const {mutate, isLoading} = useMutation(tradeDataRequest, {
    onSuccess: data => {
      setChartData(data);
    },
  });

  useEffect(() => {
    if (countryId) {
      mutate([countryId, currentYear]);
    }
  }, [countryId, currentYear]);

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

  return (
    <Holder>
      {!Number.isNaN(chartData.importsPercent) &&
        !Number.isNaN(chartData.exportsPercent) && (
          <Summary>{`In ${currentYear}, exports ${
            chartData.exportsPercent > 100
              ? 'increased'
              : chartData.exportsPercent === 100
              ? 'is same'
              : 'decreased'
          } ${chartData.exportsPercent === 100 ? 'as' : 'by'} ${
            chartData.exportsPercent
          }% and imports ${
            chartData.importsPercent > 100
              ? 'increased'
              : chartData.importsPercent === 100
              ? 'is same'
              : 'decreased'
          } ${chartData.importsPercent === 100 ? 'as' : 'by'} ${
            chartData.importsPercent
          }% compared to ${currentYear - 1}.`}</Summary>
        )}
      <ChartHolder className="scalein animation-duration-300">
        <H3>Exports</H3>
        <Treemap
          config={{
            data: chartData.exports,
            groupBy: ['HS2'],
            sum: 'Trade Value',
          }}
        />
      </ChartHolder>
      <ChartHolder className="scalein animation-duration-300 animation-delay-100">
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

const ChartHolder = styled.div`
  width: 100%;
  padding: 1em;
  min-height: 30vh;
  background-color: white;
  overflow: hidden;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.15));
  @media ${device.pad} {
    min-height: 300px;
  }
`;

const Summary = styled.div`
  width: 100%;
  user-select: all;
  font-size: 1.3em;
`;
