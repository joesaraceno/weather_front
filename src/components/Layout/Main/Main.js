import React from 'react';
import styled from 'styled-components';
import { Button, } from 'semantic-ui-react';

import Feeds from '../../Feeds/Feeds';
import Chart from '../../Charts/Chart';


const ChartWrapper = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 2em;
  font-family: 'Waterlily', cursive;
  font-size: 13px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3em;
`;


const FeedWrapper = styled.div`
  margin-top: 2em;
  height: 50%;
`;


export default function Main({getResults, feeds, loading }) {
  return (
    <div>
      <FeedWrapper className="ui container">
        <ButtonWrapper>
          <Button color="teal" 
            disabled={ loading ? true : false } 
            onClick={ () => { getResults() } }>
              Get New Readings
          </Button>
        </ButtonWrapper>
        <Feeds feeds={ feeds } />
      </FeedWrapper>
      <ChartWrapper>
        <Chart data={ feeds } />
      </ChartWrapper>
    </div>
  );
}