import React from 'react';
import styled from 'styled-components'
import { format } from 'date-fns';
import { Card } from 'semantic-ui-react';


import { determineColor } from '../../utils/TemperatureUtils';
import FeedTrend from './FeedTrend';

const Time = styled.p`
  font-size: 18px;
`;

const Temp = styled.p`
  font-size: 22px;
`;

export default function Feed ({ feed }) {
  const { created_at, entry_id, field1, trend } = feed;
  const formattedSampleDate = format (new Date (created_at), 'h:mm:ss aa');
  const color = determineColor(field1);
  return ( 
    <Card color={color}>
      <Card.Content textAlign='right'>
        <Card.Description>
          <Time>{ formattedSampleDate }</Time>
          <Temp><b>{ field1 }</b> &deg;F</Temp>
        </Card.Description>
        <Card.Meta>Entry# {entry_id}</Card.Meta>
      </Card.Content>
      <Card.Content extra textAlign='right'>
        <FeedTrend trend={trend}></FeedTrend>
      </Card.Content>
    </Card>
  )
}