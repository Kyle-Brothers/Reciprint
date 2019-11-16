import React, {Component} from 'react';
import axios from 'axios';
import Item from './item';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

class Result extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      s_input: '',
      m_input: '',
      s_categories: [],
      m_categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryList/20170426?applicationId=1070935156909805148',
      )
      .then(response => {
        this.setState({
          s_categories: response.data.result.small,
          m_categories: response.data.result.medium,
        });
      });

    axios
      .get(
        'https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070935156909805148',
      )
      .then(response => {
        this.setState({
          results: response.data.result,
        });
      });
  }

  sHandleChange(e) {
    this.setState({s_input: e.target.value});
  }

  render() {
    const {results} = this.state;
    const {s_categories} = this.state;
    const {m_categories} = this.state;
    console.log(results);
    console.table(s_categories);
    console.table(m_categories);
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材</InputLabel>
          <Select
            native
            value={this.state.s_input}
            onChange={this.sHandleChange}
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}>
            <option value="" />
            {s_categories.map(s => (
              <option>{s.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材2</InputLabel>
          <Select
            native
            value={this.state.m_input}
            /*onChange={handleChange('age')} */
            inputProps={{
              name: 'age',
              id: 'age-native-simple',
            }}>
            <option value="" />
            {m_categories.map(m => (
              <option>{m.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        {results.map(result => (
          <Item result={result} />
        ))}
      </div>
    );
  }
}

export default Result;
