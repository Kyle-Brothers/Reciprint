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
      mresults: [],
      s_input: '',
      s_name: [],
      s_url: '',
      sresult: [],
      m_parent: '',
      m_input: '',
      m_name: [],
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
    this.setState({sresult: []});
    this.setState({mresult: []});
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070935156909805148&categoryId=${this.state.m_parent}-${this.state.m_input}`,
      )
      .then(response => {
        this.setState({
          mresults: response.data.result,
        });
      });
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=1070935156909805148&categoryId=${this.state.s_url}`,
      )
      .then(response => {
        this.setState({
          sresults: response.data.result,
        });
      });
  };

  sHandleChange = e => {
    console.log('hello');
    let list = [];
    list.push(e.target.value.split(','));
    console.log(list[0][1].slice(-11, -1));
    this.setState({s_name: e.target.value});
    this.setState({s_input: list[0][0]});
    this.setState({s_url: list[0][1]});
  };

  mHandleChange = e => {
    let list = [];
    list.push(e.target.value.split(','));
    this.setState({m_name: e.target.value});
    this.setState({m_input: list[0][0]});
    this.setState({m_parent: list[0][1]});
  };

  render() {
    const {mresults} = this.state;
    const {s_categories} = this.state;
    const {m_categories} = this.state;
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材</InputLabel>
          <Select
            native
            value={this.state.s_name}
            onChange={this.sHandleChange}>
            <option value="" />
            {s_categories.map(s => (
              <option value={[`${s.categoryId}`, `${s.categoryUrl}`]}>
                {s.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">食材2</InputLabel>
          <Select
            native
            value={this.state.m_name}
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
          <button onClick={this.onClick}>反映</button>
        </div>
        {mresults.map(mresult => (
          <Item result={mresult} />
        ))}
      </div>
    );
  }
}

export default Result;
