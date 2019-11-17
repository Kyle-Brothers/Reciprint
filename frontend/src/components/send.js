import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import {useAlert} from 'react-alert';

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }

  onClick = () => {
    let params = new URLSearchParams();
    let url = this.props.url;
    params.append('url', url);
    console.log(this.props.url);
    const alert = useAlert();
    axios
      .post('http://localhost:8000/api/Pdf/', params)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <ButtonGroup size="large" aria-label="small outlined button group">
          <Button onClick={this.onClick}>レシピを印刷する</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Send;
