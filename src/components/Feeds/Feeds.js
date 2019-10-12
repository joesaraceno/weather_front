import React from 'react';
import { Card, Dimmer, Grid, Image, Loader, Segment } from 'semantic-ui-react';

import Feed from './Feed';
import loaderImage from './short-paragraph.png';

const sortFeeds = function(a, b) {
  return a.entry_id < b.entry_id ? 1 : -1;
};

// add a trend value to each feed item
const addMetaToFeeds = (feeds) => {
  feeds.forEach((feed, index) => {
    const thisTemp = feed.field1;
    if (index < 1) {
      return feed.trend = null;
    }
    const lastTemp = feeds[index-1].field1;
    if (lastTemp < thisTemp) {
      return feed.trend = 1;
    } else if (lastTemp > thisTemp) {
      return feed.trend = -1;
    }
    return feed.trend = 0;
  })
}

export default function Feeds ({ feeds, loading }) {
  if (loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        <Image src={ loaderImage } alt="Loading" />
      </Segment>
    );
  }
  
  addMetaToFeeds(feeds);
  const sortedFeeds = feeds.sort(sortFeeds);

  return (
    <Grid columns={1} divided>
      <Card.Group itemsPerRow={5} doubling>
        { sortedFeeds.map(feed => {
          return <Feed key={ feed.entry_id } feed={ feed } />
        }) }
      </Card.Group>
    </Grid>
  )
}