import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const ProfileHeader = () => {
  return (
    <Tabs style={{marginTop: '25px'}} defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Tweets" key="1">Content of Tab Pane 1</TabPane>
      <TabPane tab="Followers" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="Following" key="3">Content of Tab Pane 3</TabPane>
    </Tabs>
  );
};

export default ProfileHeader
