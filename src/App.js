// libs
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Header } from 'semantic-ui-react';
import { format } from 'date-fns';

// utils
import { getTemperatureFeeds } from './utils/TemperatureUtils';

// components
import Feeds from './components/Feeds/Feeds';

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
      const { name, description } = channel;
      const channelId = channel.id;
      const latestDate = this.getDateOfLatestResult(feeds[0]);
      return (
        <PageContainer>
          <HeadingWrapper>
            <Header as='h2' textAlign='center'>{ name }</Header>
            <Header as='h4' textAlign='center'>{ description }</Header>
            <Header as='h4' textAlign='center'>{ latestDate } <TimeZone>MDT</TimeZone></Header>
            <SubHeading >Channel #{ channelId }</SubHeading>
          </HeadingWrapper>
          <FeedWrapper className="ui container">
            <ButtonWrapper>
              <Button color="teal" onClick={() => {this.getResults()}}>Get New Readings</Button>
            </ButtonWrapper>
            <Feeds feeds={feeds} loading={loading}></Feeds>
          </FeedWrapper>
        </PageContainer>
      );
    }
    return <Fragment></Fragment>
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
