import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export interface Props {
  type: 'AntDesign' | 'Entypo';
  testID?: string;
  name: string;

  size?: number;
  style?: StyleProp<TextStyle> | any;
}
const IconPack = {
  AntDesign,
  Entypo,
};

const Icon = (props: Props) => {
  const IconComponent = IconPack[props.type];

  return <IconComponent {...props} />;
};

export default Icon;
