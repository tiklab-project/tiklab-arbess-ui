import React from "react";
import {FullWorkTodo} from "tiklab-widget-ui";


/**
 * 全屏我的任务待办（用于工作台点击更多显示）
 */
const FullWorkTodoContent = props =>{

    const changeTodo =() =>{
        props.history.push("/index/home")
    }


    return  <div style={{maxWidth:"1120px",margin:"auto"}}>
                <FullWorkTodo bgroup={"matflow"} changeTodo={changeTodo}/>
            </div>
}

export default FullWorkTodoContent
