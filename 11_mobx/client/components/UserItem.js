import React from 'react';
import { ListItem } from 'react-native-elements';

// ListItem : https://react-native-training.github.io/react-native-elements/docs/listitem.html 참고
export default ({ user, chevron }) => {
  return <ListItem
    leftAvatar={{ source: { uri: user.avatar } }}
    title={user.name}
    chevron={chevron}
  />;
};