import React from 'react';
import styled from 'styled-components'
import { format } from 'date-fns';
import { Card } from 'semantic-ui-react';

const Time = styled.p`
  font-size: 18px;
`;

const Temp = styled.p`
  font-size: 22px;
`;

const determineColor = (temp) => {
  switch(true) {
    case (temp < 20): 
      return 'white';
    case (temp < 40):
      return 'blue';
    case (temp < 60): 
      return 'purple';
    case (temp < 70):
      return 'green';
    case (temp < 80):
      return 'yellow';
    case (temp < 90):
      return 'orange';
    case (temp < 100):
      return 'orange';
    default:
      return 'red';
  }
};

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
      <Card.Content extra textAlign='center'>{ trend }</Card.Content>
    </Card>
  )
}