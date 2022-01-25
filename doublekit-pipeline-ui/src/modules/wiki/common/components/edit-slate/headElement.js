/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-17 13:17:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-27 13:19:01
 */
import React, { useMemo, useState, useCallback } from "react";
const HeadElement = (props) => {
    const {head,attributes,children} = props;
    const render = (head) => {
        switch (head) {
			case "h1":
				return <h1 {...attributes}>{children}</h1>;
			case "h2":
				return <h2 {...attributes}>{children}</h2>;
			case "h3":
				return <h3 {...attributes}>{children}</h3>;
            case "h4":
                return <h4 {...attributes}>{children}</h4>;
            case "h5":
				return <h5 {...attributes}>{children}</h5>;
            case "h6":
                return <h6 {...attributes}>{children}</h6>;
			default:
				return <div {...props.attributes}>{props.children}</div>;
		}
    }
	return (
        render(head)
	);
};

export default HeadElement