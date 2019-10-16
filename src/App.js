// libs
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Header } from 'semantic-ui-react';
import { format } from 'date-fns';

// utils
import { getTemperatureFeeds } from './utils/TemperatureUtils';

// components
import Feeds from './components/Feeds/Feeds';
import Chart from './components/Charts/Chart';

// styled components
const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeedWrapper = styled.div`
  margin-top: 2em;
  height: 50%;
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 2em;  
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3em;
`;

const SubHeading = styled.p`
  text-align: center;
  font-size: 12px;
  color: grey;
  opacity: .6;
  margin-bottom: 0;
  padding-bottom: 0;
`;

const HeadingWrapper = styled.div`
  max-width: 300px;
`;

const TimeZone = styled.span`
  font-size:12px;
  color: #A9A9A9;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: null,
      errMessage: null,
      date: null,
    }
  }
  render() {
    if (this.state.errMessage && !this.state.results) {
      return (
        <Fragment>
          Error: { this.state.errMessage }
        </Fragment>
      );
    } else if (!this.state.errMessage && this.state.results) {
      const { loading, results } = this.state;
      const { channel, feeds } = results;
      const { name, description, metadata } = channel;
      const { status, timezone } = JSON.parse(metadata);
      const channelId = channel.id;
      const latestDate = this.getDateOfLatestResult(feeds[0]);
      return (
        <PageContainer>
          <HeadingWrapper>
            <Header as='h2' textAlign='center'>{ name }</Header>
            <Header as='h4' textAlign='center'>{ description }</Header>
            {/* TODO replace timezone with the one from channel metadata
            TODO add channel status */}
            <Header as='h4' textAlign='center'>{ latestDate } <TimeZone>MDT</TimeZone></Header>
            <SubHeading >Channel #{ channelId }</SubHeading>
          </HeadingWrapper>
          <FeedWrapper className="ui container">
            <ButtonWrapper>
              <Button color="teal" onClick={ () => { this.getResults() } }>Get New Readings</Button>
            </ButtonWrapper>
            <Feeds feeds={ feeds } loading={ loading }></Feeds>
          </FeedWrapper>
          <ChartWrapper>
            <Chart data={ feeds } />
          </ChartWrapper>

        </PageContainer>
      );
    }
    return (<Fragment></Fragment>);
  }

  // fetch results from util
  async getResults() {
    this.setState({ loading: true })
    try {
      const results = await getTemperatureFeeds();
      this.setState({ results, loading: false });
    } catch (err) {
      this.setState({ errMessage: err.message, loading: false });
    }
  }
  
  // perform the initial fetch
  async componentDidMount() {
    this.getResults();
  }

  getDateOfLatestResult(feed) {
    const { created_at } = feed;
    return format(new Date(created_at), 'eeee, MM/dd/yyyy');
  }

};

export default App;


// import * as React from 'react'
// import {
//   LineSeries, Tooltip,
//   ChartProvider, XAxis, YAxis,
// } from 'rough-charts'
// // import { colors } from './colors'

// const colors = [
//   '#EACA5C',
//   '#C4513D',
//   '#4F5E76'
// ];

// const data = [
//   { name: 'A', value1: 30, value2: 35 },
//   { name: 'B', value1: 90, value2: 17 },
//   { name: 'C', value1: 50, value2: 23 },
//   { name: 'D', value1: 40, value2: 15 },
//   { name: 'E', value1: 70, value2: 39 },
//   { name: 'G', value1: 30, value2: 25 },
//   { name: 'H', value1: 100, value2: 31 },
//   { name: 'I', value1: 110, value2: 32 },
// ]

// export default function App () {
//   return (

//     <ChartProvider
//       height={400}
//       data={data}
//     >
//       <XAxis dataKey="name" />
//       <YAxis />
//       <LineSeries
//         dataKey="value1"
//         options={{
//           stroke: colors[0],
//           strokeWidth: 2,
//         }}
//       />
//       <LineSeries
//         dataKey="value2"
//         options={{
//           stroke: colors[3],
//           strokeWidth: 2,
//         }}
//       />
//       <Tooltip />
//     </ChartProvider>
//   )
// }

