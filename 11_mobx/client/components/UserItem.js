import React from 'react';
import { observer } from 'mobx-react';
import { ListItem } from 'react-native-elements';

export default observer(({ user, chevron }) => {
  return <ListItem
    leftAvatar={{ source: { uri: user.avatar } }}
    title={user.name}
    chevron={chevron}
  />;
});