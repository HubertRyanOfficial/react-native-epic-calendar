import React, { memo } from 'react'; // * modules
// * components

import { Container, DayContainer, DayText } from './styles'; // * utils
//

function HeaderContainer() {
  return /*#__PURE__*/React.createElement(Container, {
    style: {
      elevation: 1
    }
  }, /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "D")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "S")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "T")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "Q")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "Q")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "S")), /*#__PURE__*/React.createElement(DayContainer, null, /*#__PURE__*/React.createElement(DayText, null, "S")));
}

export default /*#__PURE__*/memo(HeaderContainer); // Desenvolvido por Hubert Ryan
//# sourceMappingURL=inde.js.map