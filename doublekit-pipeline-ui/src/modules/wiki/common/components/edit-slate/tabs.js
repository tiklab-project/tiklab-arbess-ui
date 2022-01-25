/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-26 10:47:31
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-26 11:22:07
 */
import React,{useState} from "react";
import "./tabs.scss"

const Tabs = (props)=>{
    const [currentIndex,setCurrentIndex] = useState(0)
	const checkTitleIndex = ( index ) =>{
		return index === currentIndex ? "tab_title active" : "tab_title"
	}

	const checkItemIndex = ( index ) =>{
		return index === currentIndex ? "tab_item tab_show" : "tab_item"
	}

		return(
			<div className="tabs">
				{ /* 动态生成Tab导航 */ }
				<div className="tab_title_wrap">
					{ 
						React.Children.map( props.children , ( element,index ) => {
							return(
								<div onClick={ (  ) => setCurrentIndex(index) } className={ checkTitleIndex( index ) }>{ element.props.name }</div>
							)
						}) 
					}
				</div>
				{ /* Tab内容区域 */ }
				<div className="tab_item_wrap">
					{
						React.Children.map(props.children,( element,index )=>{
							return(
								<div className={ checkItemIndex( index ) }>{ element }</div>
							)
						})
					}
				</div>
			</div>
		)
	
}

export default Tabs;