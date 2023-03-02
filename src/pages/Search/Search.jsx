import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {AutoComplete} from 'primereact/autocomplete';

import {allCountriesRequest} from 'api/country';

import PageTransition from 'components/PageTransition';
import {MiddleContainer} from 'components/Containers';
import {H2, H3} from 'components/Labels';
import Loader from 'components/Loader';

export default function Search() {
  // Country data
  const {data, isLoading} = useQuery({
    queryKey: ['allCountriessRequest'],
    queryFn: allCountriesRequest,
  });

  const [searchValue, setSearchValue] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const completeMethod = event => {
    let _suggestions = [];
    if (event.query === '') {
      _suggestions = data;
    } else {
      _suggestions = data.filter(d => {
        return d['EN Label']
          ?.toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }

    setSuggestions(_suggestions);
  };

  const itemTemplate = d => {
    return <p>{d['EN Label']}</p>;
  };

  // Display loading indicator while fetching countries list
  if (isLoading) {
    return (
      <PageTransition>
        <Holder>
          <Loader />
        </Holder>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Holder>
        <MiddleContainer>
          <H2 className="mb-5">National Trade Data</H2>
          <H3 className="mb-2">Search a country:</H3>
          <AutoComplete
            value={searchValue}
            suggestions={suggestions}
            completeMethod={completeMethod}
            onChange={e => setSearchValue(e.value)}
            itemTemplate={itemTemplate}
            field="EN Label"
            scrollHeight="70vh"
          />
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
