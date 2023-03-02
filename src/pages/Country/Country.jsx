import React from 'react';
import styled from 'styled-components';

import PageTransition from 'components/PageTransition';
import {MiddleContainer} from 'components/Containers';
import {H2} from 'components/Labels';

export default function Country() {
  return (
    <PageTransition>
      <Holder>
        <MiddleContainer>
          <H2>National Trade Data</H2>
        </MiddleContainer>
      </Holder>
    </PageTransition>
  );
}

const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  padding-top: 10em;
`;
