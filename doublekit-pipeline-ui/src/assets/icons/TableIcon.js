/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-23 09:20:32
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-23 15:34:42
 */
import * as React from "react";


import { Icon } from "antd";
import { ReactComponent as InsertColLeftSvg } from "./insert_col_left.svg";
import { ReactComponent as InsertColRightSvg } from "./insert_col_right.svg";
import { ReactComponent as InsertRowAboveSvg } from "./insert_row_above.svg";
import { ReactComponent as InsertRowBelowSvg } from "./insert_row_below.svg";
import { ReactComponent as RemoveColSvg } from "./delete_column.svg";
import { ReactComponent as RemoveRowSvg } from "./delete_row.svg";
import { ReactComponent as RemoveTableSvg } from "./delete.svg";

const DEFAULT_STYLE = {
  fontSize: "14px",
  color: "rgba(0,0,0,.85)",
};

const InsertRowAboveIcon = ({ style, ...rest }) => (
  <Icon
    component={InsertRowAboveSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const InsertRowBelowIcon = ({ style, ...rest }) => (
  <Icon
    component={InsertRowBelowSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const InsertColLeftIcon = ({ style, ...rest }) => (
  <Icon
    component={InsertColLeftSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const InsertColRightIcon = ({ style, ...rest }) => (
  <Icon
    component={InsertColRightSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const RemoveRowIcon = ({ style, ...rest }) => (
  <Icon
    component={RemoveRowSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const RemoveColIcon = ({ style, ...rest }) => (
  <Icon
    component={RemoveColSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

const RemoveTableIcon = ({ style, ...rest }) => (
  <Icon
    component={RemoveTableSvg}
    style={{ ...DEFAULT_STYLE, ...style }}
    {...rest}
  />
);

export {
  InsertRowAboveIcon,
  InsertRowBelowIcon,
  InsertColLeftIcon,
  InsertColRightIcon,
  RemoveRowIcon,
  RemoveColIcon,
  RemoveTableIcon,
};
