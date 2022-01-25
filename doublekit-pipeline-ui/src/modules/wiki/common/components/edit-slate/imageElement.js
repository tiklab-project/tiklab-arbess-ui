/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-17 13:17:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-18 15:09:24
 */
import React, { useMemo, useState, useCallback } from "react";
import "./imageElement.scss"
const ImageElement = (props) => {
    const {element,attributes,children} = props;
	return (
        <div {...attributes}>
			<div contentEditable={false}>
				<img
					src={element.url}
					className= "img-element"
				/>
			</div>
			{children}
		</div>
	);
};

export default ImageElement