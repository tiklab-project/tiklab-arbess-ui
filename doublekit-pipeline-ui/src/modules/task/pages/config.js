import React from 'react'
import {Button} from "antd";
import {withRouter} from "react-router-dom";
import ConfigTop from "./configTop";
import SourceCode from "./configSourceCode";
import Structure from "./configBuild";
import Action from "./configAction";

const ConfigTask=(props)=>{
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById("box");
            let a = document.getElementById(anchorName)
            if (anchorElement) {
                console.log(anchorElement.scrollTop)
                anchorElement.scrollTop = a.offsetTop-140
            }
        }
    }
    return(
        <div className='task-config'>
            <div  className='task-config-top'>
                <ConfigTop/>
                <div className='task-config-top-a' >
                    <ul className='_cf'>
                        <li className='ac a '>
                            <a  onClick={()=>scrollToAnchor('b1')}>
                                源码管理
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('b2')}>
                                构建
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('b3')}>
                               构建后管理
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='task-config-bottom'>
                <div className='task-config-bottom-con' id='box'>
                    <div id='b1'><SourceCode/></div>
                    <div id='b2'><Structure/></div>
                    <div id='b3'><Action/></div>
                </div>
                <div className='btn'>
                    <Button
                        type='primary'
                        style={{marginRight:30}}
                        onClick={()=>props.history.push('/home/task/work')}
                    >
                        保存
                    </Button>
                    <Button onClick={()=>props.history.push('/home/task/work')}>取消</Button>
                </div>
            </div>
        </div>
    )
}
export default withRouter(ConfigTask)