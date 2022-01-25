/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-17 13:17:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-18 15:09:24
 */
import React, { useMemo, useState, useCallback } from "react";
const LineHeightElement = (props) => {
    const {lineHeight,attributes,children} = props;
    const render = (lineHeight) => {
        switch (lineHeight) {
			case "1":
				return <p {...attributes} style={{lineHeight: 1}}>{children}</p>;
			case "4":
				return <p {...attributes} style={{lineHeight: 4}}>{children}</p>;
			default:
				return <p {...props.attributes}>{props.children}</p>;
		}
    }
	return (
        render(lineHeight)
	);
};

export default LineHeightElement