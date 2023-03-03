import React from 'react';
import styled from 'styled-components';
import {Outlet} from 'react-router-dom';

import PageTransition from 'components/PageTransition';
import {MiddleContainer} from 'components/Containers';
import WaveText from 'components/WaveText';
import {H2} from 'components/Labels';

export default function Country() {
  return (
    <PageTransition>
      <Holder>
        <MiddleContainer>
          <H2 className="mb-5">
            <WaveText
              text="National Trade Data"
              replay={true}
              delay={0.3}
              duration={0.02}
            />
          </H2>
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
