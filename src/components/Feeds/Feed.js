import React from 'react';
import styled from 'styled-components'
import { format } from 'date-fns';
import { Card } from 'semantic-ui-react';

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

// redorangeyellowolivegreentealbluevioletpurplepinkbrowngreyblack

const Field = styled.p`
  font-size: 22px;
`;

export default function Feed ({ feed }) {
  const { created_at, entry_id, field1 } = feed;
  const formattedSampleDate = format (new Date (created_at), 'h:mm:ss aaaa');
  const color = determineColor(field1);
  return ( 
    <Card color={color}>
      <Card.Content textAlign={'right'}>
        <Card.Header>Temperature Reading</Card.Header>
        <Card.Meta>Entry# {entry_id}</Card.Meta>
        <Card.Description>
          <Field><b>{ field1 }</b> &deg;F</Field>
          <Field>{ formattedSampleDate }</Field>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}