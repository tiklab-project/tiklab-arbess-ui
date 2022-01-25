/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-17 13:17:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-26 16:22:19
 */
import React, { useMemo, useState, useCallback } from "react";
import "./attachmentElement.scss"
const AttachmentElement = (props) => {
    const {element,attributes,children} = props;
	return (
        <span {...attributes} className="attach-box">
			<a contentEditable={false} href={element.url}>
				<svg className="attach-icon" aria-hidden="true">
					<use xlinkHref="#iconA-07"></use>
                </svg>
			</a>	
			{children}
		</span>
	);
};

export default AttachmentElement;