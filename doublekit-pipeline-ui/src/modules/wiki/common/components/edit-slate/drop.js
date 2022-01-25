/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-18 09:45:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-18 11:11:44
 */
import React,{useState} from "react";
import "./drop.scss"
const Drop = () => {
    const [dropShow,setDropShow] = useState(false)
    return (
        <div>
            <div className = "drop-box" onClick = {() => setDropShow(!dropShow)}>
                <span className="drop-icon">
                    <i className="iconfont iconfont-color"></i>
                </span>
            </div>
            <div className={`drop-list ${dropShow ? "drop-show" : "drop-hidden"}`} onClick={()=> {}}>
                
            </div>
        </div>
    )
}
export default Drop;