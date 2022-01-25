/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-01 16:09:00
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 14:54:55
 */
import React,{Fragment} from "react";
// import { Fragment } from "react";
const Leaf = (props) => {
	let { attributes, children, leaf} = props
	// 根据属性值设置 HTML 标签
	if (leaf.bold) {
		children = <span
				{...attributes}
				style={{ fontWeight: leaf.bold ? "bold" : "normal" }}
			> 
				{children}
			</span>
	}
	if(leaf.color) {
		children = <span
				{...attributes}
				style={{ color: leaf.color ? leaf.color : "inherit" }}
			> 
				{children}
			</span>
	}
	if(leaf.fontSize) {
		children = <span
				{...attributes}
				style={{ fontSize: leaf.fontSize ? leaf.fontSize : "inherit" }}
			> 
				{children}
			</span>
	}
	if(leaf.italic) {
		children = <i
				{...attributes}
			> 
				{children}
			</i>
	}
	if(leaf.underline) {
		children = <u
				{...attributes}
			> 
				{children}
			</u>
	}
	if(leaf.strike) {
		children = <strike
				{...attributes}
			> 
				{children}
			</strike>
	}
	if(leaf.backgroundColor) {
		children = <span
				{...attributes}
				style={{ backgroundColor: leaf.backgroundColor ? leaf.backgroundColor : "inherit" }}
			> 
				{children}
			</span>
	}
	if(leaf.align) {
		children = <div
				{...attributes}
				style={{ textAlign: leaf.align ? leaf.align : "inherit" }}
			> 
				{children}
			</div>
	}
	// else if(leaf.indent) {
	// 	children = <div
	// 			{...attributes}
	// 			style={{ paddingLeft: leaf.indent ? leaf.indent : "inherit" }}
	// 		> 
	// 			{children}
	// 		</div>
	// }
	if(leaf.lineHeight) {
		children = <span
				{...attributes}
				style={{ lineHeight: leaf.lineHeight}}
			> 
				{children}
			</span>
	}
	if(leaf.sup) {
		children = <sup
				{...attributes}
			> 
				{children}
			</sup>
	}
	if(leaf.sub) {
		children = <sub
				{...attributes}
			> 
				{children}
			</sub>
	} 
	children = <span {...attributes}>{children}</span>
	return children
	// return children
};
export default Leaf;