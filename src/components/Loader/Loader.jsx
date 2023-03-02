import React from 'react';
import styled from 'styled-components';
import Spiner from 'components/Spiner';

export default function Loader({className, size = 60, label = ''}) {
  return (
    <Holder
      className={className}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <Container>
        <Spiner size={size} />
      </Container>
      {label !== '' && <Label>{label}</Label>}
    </Holder>
  );
}

const Holder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  min-height: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.p`
  color: #aaaaaa;
  text-align: center;
`;
