import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

const SubHeading = styled.p`
  text-align: center;
  font-size: 12px;
  color: grey;
  opacity: 0.6;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const HeadingWrapper = styled.div`
  max-width: 300px;
`;

const TimeZone = styled.span`
  font-size: 12px;
  color: #A9A9A9;
`;

export default function HeaderWrapper ({ channel, latestDate }) {

  const { name, description, id } = channel;
  return (
    <HeadingWrapper>
      <Header as='h2' textAlign='center'>{ name }</Header>
      <Header as='h4' textAlign='center'>{ description }</Header>
      {/* TODO replace timezone with the one from channel metadata
      TODO add channel status */}
      <Header as='h4' textAlign='center'>{ latestDate } 
        <TimeZone>MDT</TimeZone>
      </Header>
      <SubHeading >Channel #{ id }</SubHeading>
    </HeadingWrapper>
  )
}