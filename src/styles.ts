import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
`;
export const MonthTitle = styled.Text`
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #123442;
  margin: 20px 0px;
`;

export const MonthList = styled.ScrollView`
  padding: 0px 20px;
`;

export const MonthContent = styled.View``;

export const DayItemContainer = styled.FlatList`
  margin-bottom: 20px;
`;

export const DayItemContent = styled.TouchableOpacity<{
  selected: boolean;
  isWaySelected: boolean;
}>`
  width: ${width / 7.8}px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.selected == true
      ? '#03A487'
      : props.isWaySelected
      ? 'rgba(3, 164, 135, 0.15)'
      : '#fff'};
`;

export const DayItemText = styled.Text<{
  selected: boolean;
}>`
  font-size: 16px;
  color: ${props => (props.selected == true ? '#fff' : '#365866')};
`;
