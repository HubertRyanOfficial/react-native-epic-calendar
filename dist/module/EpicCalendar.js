import React, { useCallback, useEffect, useState } from "react"; // * modules

import { Alert } from "react-native";
import HeaderContainer from "./HeaderContainer/inde"; // * components

import { Container, MonthList, MonthContent, MonthTitle, DayItemContainer, DayItemContent, DayItemText } from "./styles"; // * utils
//

const days = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"];

function EpicCalendar(_ref) {
  let {
    startPoint,
    endPoint,
    monthsTitleStyle = {},
    containerStyle = {},
    contentStyle = {},
    onChangeValue
  } = _ref;
  const startPointYear = startPoint.getFullYear();
  const startPointMonth = startPoint.getMonth() + 1;
  const endPointYear = endPoint.getFullYear();
  const endPointMonth = endPoint.getMonth() + 1;
  const [data, setData] = useState([]);
  const [startPointSelected, setStartPointSelected] = useState(null);
  const [endPointSelected, setEndPointSelected] = useState(null);
  const [reSearch, setReSearch] = useState(false);
  const [daysSelected, setDaysSelected] = useState([]);
  useEffect(() => {
    if (endPoint < startPoint) {
      throw "The date in startPoint cant not be smaller than the endPoint";
    }

    main();
  }, []);
  useEffect(() => {
    if (startPointSelected && endPointSelected && reSearch) {
      let initialStartPoint = new Date(`${startPointSelected.monthId}/${startPointSelected.day}/${startPointSelected.yearId}`);
      let initialEndPoint = new Date(`${endPointSelected.monthId}/${endPointSelected.day}/${endPointSelected.yearId}`);
      let calendarList = [...data];
      var daysSelectedList = [];
      var startPointCheckEnabled = false;

      function verifyDay(dayItem) {
        if (!dayItem.endPointSelected && startPointCheckEnabled) {
          return true;
        }

        return false;
      }

      calendarList.map(item => {
        item.totalDays.map(dayItem => {
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
      var differenceInTimes = initialEndPoint.getTime() - initialStartPoint.getTime();
      var differenceInDays = differenceInTimes / (1000 * 3600 * 24) + 1;
      onChangeValue({
        totalDaysSelected: differenceInDays,
        startPointDate: initialStartPoint,
        endPointDate: initialEndPoint
      });
    } else if (startPointSelected && !endPointSelected && daysSelected.length > 0 && reSearch) {
      let calendarList = [...data];
      calendarList.map(item => {
        item.totalDays.map(dayItem => {
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
    var allData = [];
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

  function getPoints(year, point, endPointMonth, difference) {
    var listArrayMonths = [];

    function getPointSpecific() {
      if (endPointYear == startPointYear || difference == 0) {
        return i <= endPointMonth;
      } else {
        return i <= 12;
      }
    }

    for (var i = point == "start" ? startPointMonth : 1; getPointSpecific(); i++) {
      // GET ONLY Months AFTER THIS month ACTTUALY
      if (i === 1) {
        // to month list
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Janeiro",
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year),
          yearId: year,
          monthId: i
        });
      } else if (i === 2) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Fervereiro",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 3) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Março",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 4) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Abril",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 5) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Maio",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 6) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Junho",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 7) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Julho",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 8) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Agosto",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 9) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Setembro",
          yearId: year,
          monthId: i,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 10) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Outubro",
          monthId: i,
          yearId: year,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else if (i === 11) {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Novembro",
          monthId: i,
          yearId: year,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      } else {
        listArrayMonths.push({
          id: `${year}${i}`,
          name: "Dezembro",
          monthId: i,
          yearId: year,
          totalDays: getDaysFromMonth(new Date(year, i, 0).getDate(), i, year)
        });
      }
    }

    return listArrayMonths;
  }

  const getDaysFromMonth = useCallback((totalDays, monthId, yearId) => {
    let listArrayDays = [];
    let dayName = days[new Date(`${monthId}/1/${yearId}`).getDay()];

    for (let i = 1; i <= totalDays; i++) {
      listArrayDays.push({
        id: `${monthId}${yearId}${i}`,
        monthId,
        yearId,
        day: i,
        startPointSelected: false,
        endPointSelected: false,
        emptySpaces: false
      });
    }

    let emptySpaces = Array.from({
      length: days.findIndex(item => item == dayName)
    }, (v, i) => i);
    let allDays = [...emptySpaces.map(item => ({
      emptySpaces: true,
      day: null
    })), ...listArrayDays];
    return allDays;
  }, []);
  const selectItem = useCallback(item => {
    let itemSelected = item;
    let calendarList = [...data];
    let getItemYear = calendarList.find(item => item.yearId == itemSelected.yearId && item.monthId == itemSelected.monthId);
    let getItemDay = null;

    if (getItemYear) {
      getItemDay = getItemYear.totalDays.find(item => item.day == itemSelected.day);
    }

    if (getItemDay) {
      if (!startPointSelected) {
        getItemDay.startPointSelected = true;
        setStartPointSelected(item);
      } else {
        let initialStartPoint = new Date(`${startPointSelected.monthId}/${startPointSelected.day}/${startPointSelected.yearId}`);
        let initialEndPoint = new Date(`${item.monthId}/${item.day}/${item.yearId}`);

        if (endPointSelected && item.id == endPointSelected.id) {
          let calendarList2 = [...data];
          let getEndPointExists = calendarList2.find(item => item.yearId == endPointSelected.yearId && item.monthId == endPointSelected.monthId);
          let getEndDayExists = null;

          if (getEndPointExists) {
            getEndDayExists = getEndPointExists.totalDays.find(item => item.endPointSelected == true);
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
          let getStartPointExists = calendarList2.find(item => item.yearId == startPointSelected.yearId && item.monthId == startPointSelected.monthId);
          let getStartDayExists = null;

          if (getStartPointExists) {
            getStartDayExists = getStartPointExists.totalDays.find(item => item.startPointSelected == true);
          }

          if (getStartDayExists && !endPointSelected) {
            getStartDayExists.startPointSelected = false;
            setStartPointSelected(null);
          } else if (endPointSelected) {
            let getEndDayExists = null;
            let getEndPointExists = calendarList2.find(item => item.yearId == endPointSelected.yearId && item.monthId == endPointSelected.monthId);

            if (getEndPointExists) {
              getEndDayExists = getEndPointExists.totalDays.find(item => item.endPointSelected == true);
            }

            let newItem = { ...item,
              startPointSelected: true
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
          Alert.alert("Calendário", "Você deve selecionar dias a frente do ponto inicial.");
          return;
        }

        if (endPointSelected && item.id == endPointSelected.id) {
          return;
        } // * get existe end point


        function getEndPointPosition(item) {
          if (endPointSelected) {
            return item.yearId == endPointSelected.yearId && item.monthId == endPointSelected.monthId;
          }

          return item.yearId == itemSelected.yearId && item.monthId == itemSelected.monthId;
        }

        let getEndPointExists = calendarList.find(item => getEndPointPosition(item) && item.totalDays.find(item => item.endPointSelected == true));
        let getDayExists = null;

        if (getEndPointExists) {
          getDayExists = getEndPointExists.totalDays.find(item => item.endPointSelected == true);
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
  }, [data, startPointSelected, endPointSelected]);
  const renderItem = useCallback(_ref2 => {
    let {
      item
    } = _ref2;
    return /*#__PURE__*/React.createElement(DayItemContent, {
      selected: item.startPointSelected || item.endPointSelected,
      isWaySelected: item.isWaySelected || false,
      disabled: item.emptySpaces,
      onPress: () => selectItem(item)
    }, /*#__PURE__*/React.createElement(DayItemText, {
      selected: item.startPointSelected || item.endPointSelected
    }, item.day));
  }, [selectItem]);
  const ListHeaderComponent = useCallback(_ref3 => {
    let {
      monthItem
    } = _ref3;
    return /*#__PURE__*/React.createElement(MonthTitle, {
      style: monthsTitleStyle
    }, monthItem.name, " de ", monthItem.yearId);
  }, []);
  const keyExtractor = useCallback((item, index) => String(index), []);
  return /*#__PURE__*/React.createElement(Container, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(HeaderContainer, null), /*#__PURE__*/React.createElement(MonthList, {
    showsVerticalScrollIndicator: false
  }, data === null || data === void 0 ? void 0 : data.map(monthItem => /*#__PURE__*/React.createElement(MonthContent, {
    key: monthItem.id,
    style: contentStyle
  }, /*#__PURE__*/React.createElement(ListHeaderComponent, {
    monthItem: monthItem
  }), /*#__PURE__*/React.createElement(DayItemContainer, {
    data: monthItem.totalDays,
    numColumns: 7,
    renderItem: renderItem,
    keyExtractor: keyExtractor,
    contentContainerStyle: {
      alignSelf: "center"
    },
    nestedScrollEnabled: true,
    scrollEnabled: false,
    scrollToOverflowEnabled: false,
    overScrollMode: "never"
  })))));
}

export default EpicCalendar; // Desenvolvido por Hubert Ryan
//# sourceMappingURL=EpicCalendar.js.map