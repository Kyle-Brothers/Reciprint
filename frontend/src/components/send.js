import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    console.log('hello');
    console.log(this.props);
  }

  onClick = () => {
    let params = new URLSearchParams();
    params.append('url', `${this.props.url}`);

    axios
      .post('http://localhost:8000/api/Pdf/', params)
      .then(function(response) {
        console.log(this.state.inputs);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={this.onClick}>印刷</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Send;
