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
      s_input: [],
      m_parent: '',
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
  }

  onClick = () => {
    console.table(this.state.m_parent);
    console.table(this.state.m_input);
    this.setState({result: []});
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070935156909805148&categoryId=${this.state.m_parent}-${this.state.m_input}`,
      )
      .then(response => {
        this.setState({
          results: response.data.result,
        });
      });
    console.table(this.state.results);
  };

  sHandleChange = e => {
    this.setState({s_input: e.target.value});
  };

  mHandleChange = e => {
    let list = [];
    list.push(e.target.value.split(','));
    this.setState({m_input: list[0][0]});
    this.setState({m_parent: list[0][1]});
  };

  render() {
    const {results} = this.state;
    const {s_categories} = this.state;
    const {m_categories} = this.state;
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材</InputLabel>
          <Select
            native
            value={this.state.s_input}
            onChange={this.sHandleChange}>
            <option value="" />
            {s_categories.map(s => (
              <option value={s.categoryId}>{s.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材2</InputLabel>
          <Select
            native
            value={this.state.m_input}
            onChange={this.mHandleChange}>
            <option value="" />
            {m_categories.map(m => (
              <option value={[`${m.categoryId}`, `${m.parentCategoryId}`]}>
                {m.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>
        <div>
          <p>{this.state.s_input}</p>
          <p>Hello</p>
          <p>{this.state.m_input}</p>
          <p>{this.state.m_parent}</p>
          <button onClick={this.onClick}>反映</button>
        </div>
        {results.map(result => (
          <Item result={result} />
        ))}
      </div>
    );
  }
}

export default Result;
