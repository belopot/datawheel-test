import React from 'react';
import styled from 'styled-components';

import PageTransition from 'components/PageTransition';

export default function Search() {
  return (
    <PageTransition>
      <Holder>Search</Holder>
    </PageTransition>
  );
}

const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: aliceblue;
`;
