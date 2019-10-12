import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function FeedTrend ({trend}) {
  if (trend > 0) {
    return (<Icon name='long arrow alternate up' color='yellow'></Icon>);
  } else if (trend < 0) {
    return (<Icon name='long arrow alternate down' color='blue'></Icon>);
  }
  return (<Icon name='minus' color='grey'></Icon>);
}