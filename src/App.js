// libs
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

// styles
import './fonts.css';
import loaderImage from './assets/short-paragraph.png'

// utils
import { getTemperatureFeeds } from './utils/TemperatureUtils';

// components
import HeaderWrapper from './components/Layout/Header/HeaderWrapper';
import Main from './components/Layout/Main/Main';


// styled components
const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    this.getResults = this.getResults.bind(this);
  }
  render() {

    if (!this.state.loading && !this.state.errMessage && this.state.results) {
      const { results } = this.state;
      const { channel, feeds } = results;
      // const { name, description, metadata } = channel;
      // const { status, timezone } = JSON.parse(metadata);
      // const channelId = channel.id;
      // const latestDate = this.getDateOfLatestResult(feeds[0]);
      return (
        <PageContainer>
          <HeaderWrapper 
            channel={channel}
            latestDate={this.getDateOfLatestResult(feeds[0])}
          />
          <Main
            feeds={feeds}
            getResults={this.getResults}
          />
        </PageContainer>
      );
    }
    if (this.state.errMessage) {
      return (
        <Fragment>
          Error: { this.state.errMessage }
        </Fragment>
      );
    } 
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
        <Image src={ loaderImage } alt="Loading" />
      </Segment>
    );
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

