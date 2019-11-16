import React, {Component} from 'react';
import axios from 'axios';
import Item from './item';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070935156909805148&categoryId=10',
      )
      .then(response => {
        this.setState({
          results: response.data,
        });
      });
  }

  render() {
    const {results} = this.state;
    console.log(results);
    return (
      <div>
        {results.map(result => (
          <Item result={result.rank} />
        ))}
      </div>
    );
  }
}

export default Result;
