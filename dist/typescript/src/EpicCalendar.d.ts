/// <reference types="react" />
import { StyleProp, TextStyle, ScrollViewProps, ViewStyle } from "react-native";
interface Props {
    startPoint: Date;
    endPoint: Date;
    monthsTitleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ScrollViewProps>;
    contentStyle?: StyleProp<ViewStyle>;
    onChangeValue: (e: ChangeReturnProps) => void;
}
interface ChangeReturnProps {
    totalDaysSelected: number | any;
    startPointDate: Date;
    endPointDate: Date;
}
export interface TotalDaysProps {
    id: number | string;
    day: number | null;
    startPointSelected?: boolean;
    endPointSelected?: boolean;
    monthId: number;
    yearId: number;
    isWaySelected?: boolean;
    emptySpaces?: boolean;
}
declare function EpicCalendar({ startPoint, endPoint, monthsTitleStyle, containerStyle, contentStyle, onChangeValue, }: Props): JSX.Element;
export default EpicCalendar;
