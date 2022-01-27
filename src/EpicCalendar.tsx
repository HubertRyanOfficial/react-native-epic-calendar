import React, { useCallback, useEffect, useState } from "react";

// * modules

import {
  StyleProp,
  TextStyle,
  ScrollViewProps,
  ViewStyle,
  Alert,
} from "react-native";
import HeaderContainer from "./HeaderContainer";

// * components

import {
  Container,
  MonthList,
  MonthContent,
  MonthTitle,
  DayItemContainer,
  DayItemContent,
  DayItemText,
} from "./styles";

// * utils

//

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

interface DataProps {
  id: number | string;
  name: string;
  totalDays: TotalDaysProps[];
  yearId: number;
  monthId: number;
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

const days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];

function EpicCalendar({
  startPoint,
  endPoint,
  monthsTitleStyle = {},
  containerStyle = {},
  contentStyle = {},
  onChangeValue,
}: Props) {
  const startPointYear = startPoint.getFullYear();
  const startPointMonth = startPoint.getMonth() + 1;

  const endPointYear = endPoint.getFullYear();
  const endPointMonth = endPoint.getMonth() + 1;

  const [data, setData] = useState<DataProps[]>([]);
  const [startPointSelected, setStartPointSelected] =
    useState<TotalDaysProps | null>(null);
  const [endPointSelected, setEndPointSelected] =
    useState<TotalDaysProps | null>(null);
  const [reSearch, setReSearch] = useState(false);
  const [daysSelected, setDaysSelected] = useState<TotalDaysProps[]>([]);

  useEffect(() => {
    if (endPoint < startPoint) {
      throw "The date in startPoint cant not be smaller than the endPoint";
    }
    main();
  }, []);

  useEffect(() => {
    if (startPointSelected && endPointSelected && reSearch) {
      let initialStartPoint = new Date(
        `${startPointSelected.monthId}/${startPointSelected.day}/${startPointSelected.yearId}`
      );
      let initialEndPoint = new Date(
        `${endPointSelected.monthId}/${endPointSelected.day}/${endPointSelected.yearId}`
      );

      let calendarList = [...data];
      var daysSelectedList: TotalDaysProps[] = [];
      var startPointCheckEnabled = false;

      function verifyDay(dayItem: TotalDaysProps) {
        if (!dayItem.endPointSelected && startPointCheckEnabled) {
          return true;
        }
        return false;
      }

      calendarList.map((item) => {
        item.totalDays.map((dayItem) => {
          if (!dayItem.emptySpaces) {
            if (dayItem.startPointSelected) {
              startPointCheckEnabled = true;
            }
            if (verifyDay(dayItem)) {
              dayItem.isWaySelected = true;
              daysSelectedList.push(dayItem);
            } else {
              startPointCheckEnabled = false;
              dayItem.isWaySelected = false;
            }
          }
        });
      });

      setData(calendarList);
      setDaysSelected(daysSelectedList);
      setReSearch(false);
      var differenceInTimes =
        initialEndPoint.getTime() - initialStartPoint.getTime();

      var differenceInDays = differenceInTimes / (1000 * 3600 * 24) + 1;
      onChangeValue({
        totalDaysSelected: differenceInDays,
        startPointDate: initialStartPoint,
        endPointDate: initialEndPoint,
      });
    } else if (
      startPointSelected &&
      !endPointSelected &&
      daysSelected.length > 0 &&
      reSearch
    ) {
      let calendarList = [...data];

      calendarList.map((item) => {
        item.totalDays.map((dayItem) => {
          if (!dayItem.emptySpaces) {
            dayItem.isWaySelected = false;
          }
        });
      });

      setDaysSelected([]);
      setData(calendarList);
      setReSearch(false);
    }
  }, [startPointSelected, endPointSelected, data, reSearch, daysSelected]);

  function main() {
    var allData: any[] = [];
    const difference = endPointYear - startPointYear;
    if (endPointYear == startPointYear) {
      allData.push(...getPoints(startPointYear, "end", endPointMonth, 0));
    } else {
      for (let i = startPointYear; i <= startPointYear + difference; i++) {
        if (i == startPointYear) {
          allData.push(...getPoints(i, "start", 0, endPointYear - i));
        } else {
          allData.push(...getPoints(i, "end", endPointMonth, endPointYear - i));
        }
      }
    }

    setData(allData);
  }

  function getPoints(
    year: number,
    point: string,
    endPointMonth: number,
    difference: number
  ) {
    var listArrayMonths = [];

    function getPointSpecific() {
      if (endPointYear == startPointYear || difference == 0) {
        return i <= endPointMonth;
      } else {
        return i <= 12;
      }
    }

    for (
      var i = point == "start" ? startPointMonth : 1;
      getPointSpecific();
      i++
    ) {
      // GET ONLY Months AFTER THIS month ACTTUALY
      if (i === 1) {
        // to month list

        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Janeiro",
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
          yearId: year,
          monthId: i,
        });
      } else if (i === 2) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Fervereiro",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 3) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Março",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 4) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Abril",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 5) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Maio",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 6) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Junho",
          yearId: year,

          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 7) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Julho",
          yearId: year,

          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 8) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Agosto",
          yearId: year,

          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 9) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Setembro",
          yearId: year,

          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 10) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Outubro",
          monthId: i,
          yearId: year,

          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else if (i === 11) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Novembro",
          monthId: i,
          yearId: year,

          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      } else {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Dezembro",
          monthId: i,
          yearId: year,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
        });
      }
    }

    return listArrayMonths;
  }

  const getDaysFromMonth = useCallback(
    (totalDays: number, monthId: number, yearId: number) => {
      let listArrayDays: any[] = [];
      let dayName = days[new Date(`${monthId}/1/${yearId}`).getDay()];

      for (let i = 1; i <= totalDays; i++) {
        listArrayDays.push({
          id: `${monthId}${yearId}${i}`,
          monthId,
          yearId,
          day: i,
          startPointSelected: false,
          endPointSelected: false,
          emptySpaces: false,
        });
      }

      let emptySpaces = Array.from(
        { length: days.findIndex((item) => item == dayName) },
        (v, i) => i
      );

      let allDays = [
        ...emptySpaces.map((item) => ({ emptySpaces: true, day: null })),
        ...listArrayDays,
      ];

      return allDays;
    },
    []
  );

  const selectItem = useCallback(
    (item: TotalDaysProps) => {
      let itemSelected = item;
      let calendarList = [...data];
      let getItemYear = calendarList.find(
        (item) =>
          item.yearId == itemSelected.yearId &&
          item.monthId == itemSelected.monthId
      );
      let getItemDay = null;

      if (getItemYear) {
        getItemDay = getItemYear.totalDays.find(
          (item) => item.day == itemSelected.day
        );
      }

      if (getItemDay) {
        if (!startPointSelected) {
          getItemDay.startPointSelected = true;
          setStartPointSelected(item);
        } else {
          let initialStartPoint = new Date(
            `${startPointSelected.monthId}/${startPointSelected.day}/${startPointSelected.yearId}`
          );
          let initialEndPoint = new Date(
            `${item.monthId}/${item.day}/${item.yearId}`
          );

          if (endPointSelected && item.id == endPointSelected.id) {
            let calendarList2 = [...data];

            let getEndPointExists = calendarList2.find(
              (item) =>
                item.yearId == endPointSelected.yearId &&
                item.monthId == endPointSelected.monthId
            );

            let getEndDayExists = null;

            if (getEndPointExists) {
              getEndDayExists = getEndPointExists.totalDays.find(
                (item) => item.endPointSelected == true
              );
            }

            if (getEndDayExists) {
              getEndDayExists.endPointSelected = false;
              setEndPointSelected(null);
            }
            setReSearch(true);
            setData(calendarList2);
          }

          if (startPointSelected && item.id == startPointSelected.id) {
            let calendarList2 = [...data];

            let getStartPointExists = calendarList2.find(
              (item) =>
                item.yearId == startPointSelected.yearId &&
                item.monthId == startPointSelected.monthId
            );

            let getStartDayExists = null;

            if (getStartPointExists) {
              getStartDayExists = getStartPointExists.totalDays.find(
                (item) => item.startPointSelected == true
              );
            }

            if (getStartDayExists && !endPointSelected) {
              getStartDayExists.startPointSelected = false;
              setStartPointSelected(null);
            } else if (endPointSelected) {
              let getEndDayExists = null;

              let getEndPointExists = calendarList2.find(
                (item) =>
                  item.yearId == endPointSelected.yearId &&
                  item.monthId == endPointSelected.monthId
              );

              if (getEndPointExists) {
                getEndDayExists = getEndPointExists.totalDays.find(
                  (item) => item.endPointSelected == true
                );
              }

              let newItem = {
                ...item,
                startPointSelected: true,
              };
              getStartDayExists = newItem;
              if (getEndDayExists) getEndDayExists.endPointSelected = false;
              setStartPointSelected(newItem);
              setEndPointSelected(null);
            }
            setData(calendarList2);
            setReSearch(true);

            return;
          }

          if (initialEndPoint < initialStartPoint) {
            Alert.alert(
              "Calendário",
              "Você deve selecionar dias a frente do ponto inicial."
            );
            return;
          }

          if (endPointSelected && item.id == endPointSelected.id) {
            return;
          }

          // * get existe end point

          function getEndPointPosition(item: any) {
            if (endPointSelected) {
              return (
                item.yearId == endPointSelected.yearId &&
                item.monthId == endPointSelected.monthId
              );
            }

            return (
              item.yearId == itemSelected.yearId &&
              item.monthId == itemSelected.monthId
            );
          }

          let getEndPointExists = calendarList.find(
            (item) =>
              getEndPointPosition(item) &&
              item.totalDays.find((item) => item.endPointSelected == true)
          );

          let getDayExists = null;

          if (getEndPointExists) {
            getDayExists = getEndPointExists.totalDays.find(
              (item) => item.endPointSelected == true
            );
          }

          if (getDayExists) {
            getDayExists.endPointSelected = false;
          }

          getItemDay.endPointSelected = true;
          setEndPointSelected(getItemDay);
          setReSearch(true);
        }
      }
      setReSearch(true);
      setData(calendarList);
    },
    [data, startPointSelected, endPointSelected]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <DayItemContent
          selected={item.startPointSelected || item.endPointSelected}
          isWaySelected={item.isWaySelected || false}
          disabled={item.emptySpaces}
          onPress={() => selectItem(item)}
        >
          <DayItemText
            selected={item.startPointSelected || item.endPointSelected}
          >
            {item.day}
          </DayItemText>
        </DayItemContent>
      );
    },
    [selectItem]
  );

  const ListHeaderComponent = useCallback(
    ({ monthItem }) => (
      <MonthTitle style={monthsTitleStyle}>
        {monthItem.name} de {monthItem.yearId}
      </MonthTitle>
    ),
    []
  );

  const keyExtractor = useCallback((item, index) => String(index), []);

  return (
    <Container style={containerStyle}>
      <HeaderContainer />
      <MonthList showsVerticalScrollIndicator={false}>
        {data?.map((monthItem) => (
          <MonthContent key={monthItem.id} style={contentStyle}>
            <ListHeaderComponent monthItem={monthItem} />
            <DayItemContainer
              data={monthItem.totalDays}
              numColumns={7}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={{
                alignSelf: "center",
              }}
              nestedScrollEnabled
              scrollEnabled={false}
              scrollToOverflowEnabled={false}
              overScrollMode="never"
            />
          </MonthContent>
        ))}
      </MonthList>
    </Container>
  );
}

export default EpicCalendar;
// Desenvolvido por Hubert Ryan
