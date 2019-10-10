import React, { Component, Fragment } from 'react';
import { getTemperatureFeeds } from './utils/TemperatureUtils';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

import Feeds from './components/Feeds/Feeds';

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 3em;
`;

const FeedWrapper = styled.div`
  margin-top: 3em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3em;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: null,
      errMessage: null
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
      return (
        <PageContainer>
          <h2 className="ui center aligned header">{ name }</h2>
          <h3 className="ui center aligned header">{description }</h3>
          <h4 className="ui center aligned header">ID# { channelId }</h4>
          <FeedWrapper className="ui container">
            <ButtonWrapper>
              <Button onClick={(e) => {this.getResults(e)}} color="teal">Get Newer Readings</Button>
            </ButtonWrapper>
            <Feeds feeds={feeds} loading={loading}></Feeds>
          </FeedWrapper>
        </PageContainer>
      );
    }
    return <Fragment></Fragment>
  }

  async componentDidMount() {
    this.getResults();
  }

  async getResults() {
    this.setState({ loading: true })
    try {
      const results = await getTemperatureFeeds();
      this.setState({ results, loading: false });
    } catch (err) {
      this.setState({ errMessage: err.message, loading: false });
    }
  }
};

export default App;
