import React from 'react';
import { Icon } from 'semantic-ui-react';

export default function FeedTrend ({trend}) {
  if (trend > 0) {
    return (<Icon name='angle up' color='yellow'></Icon>);
  } else if (trend < 0) {
    return (<Icon name='angle down' color='blue'></Icon>);
  } else if (trend === 0) {
    return '-';
  }
  return '';
}