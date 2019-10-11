import React from 'react';
import { Card, Dimmer, Grid, Image, Loader, Segment } from 'semantic-ui-react';

import Feed from './Feed';

export default function Feeds ({ feeds, loading }) {
  if (loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    );
  }

  var sortFeeds = function(a,b) {
    return a.entry_id < b.entry_id ? 1 : -1;
  };

  const sortedFeeds = feeds.sort(sortFeeds);

  return (
    <Grid columns={1} divided>
      <Card.Group itemsPerRow={5} doubling>
        {sortedFeeds.map(feed => {
          return <Feed key={feed.entry_id} feed={feed} />
        })}
      </Card.Group>
    </Grid>
  )
}