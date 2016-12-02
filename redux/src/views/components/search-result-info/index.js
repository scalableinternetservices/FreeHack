import React, { PropTypes } from 'react';

import { Row, Col, Card, Button } from 'antd';

import '../../styles/search-result-info.css'

const SearchResultInfo = ({ terms }) => {
  return (
    <Row className="search-result-info">
      <Col span={12} offset={6} style={{ textAlign: 'center' }}>
        <br />
          {terms.map(function(object, i){
            switch (object.term_type) {
              case 'HASHTAG':
                return <Button className="term" type="primary" key={i}>#{object.term}</Button>;
              case 'MENTION':
                return <Button className="term" type="default" key={i}>@{object.term}</Button>;
              default:
                return <Button className="term" type="ghost" key={i}>{object.term}</Button>;
            }
          })}
        <br />
      </Col>
    </Row>
  );
};

SearchResultInfo.propTypes = {
  terms: PropTypes.array.isRequired,
};

SearchResultInfo.defaultProps = {
  terms: [],
};

export default SearchResultInfo
