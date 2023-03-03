import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';
import {AutoComplete} from 'primereact/autocomplete';
import {useNavigate} from 'react-router-dom';

import {allCountriesRequest} from 'api/country';
import {useStore} from 'state/store';

import PageTransition from 'components/PageTransition';
import {MiddleContainer} from 'components/Containers';
import {H2, H3} from 'components/Labels';
import Loader from 'components/Loader';
import WaveText from 'components/WaveText';

export default function Search() {
  const navigate = useNavigate();

  const setCurrentCountry = useStore(state => state.setCurrentCountry);

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
    const countryId = d['ID'];
    return (
      <CountryItem
        onClick={() => {
          setCurrentCountry(d);
          navigate(`/country/${countryId}`);
        }}
      >
        {d['EN Label']}
      </CountryItem>
    );
  };

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
          {isLoading ? (
            <Loader label="Loading country data" />
          ) : (
            <>
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
            </>
          )}
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

const CountryItem = styled.p`
  padding: 0.5em 1em;
`;
