import React from 'react';
import { Row, Col, Affix, AutoComplete } from 'antd';

import '../../styles/search-bar.css'

function onSelect(value) {
  console.log('onSelect', value);
}

const SearchBar = React.createClass({
  getInitialState() {
    return {
      dataSource: [],
    };
  },
  handleChange(value) {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  },
  render() {
    const { dataSource } = this.state;
    return (
      <Affix offsetTop={75} className='search-bar'>
        <Row>
          <Col span={24}>
            <AutoComplete
              dataSource={dataSource}
              style={{ width: 200 }}
              onSelect={this.props.onSearch}
              onChange={this.handleChange}
              className='text-input'
            />
          </Col>
        </Row>
      </Affix>
    );
  },
});

export default SearchBar;
