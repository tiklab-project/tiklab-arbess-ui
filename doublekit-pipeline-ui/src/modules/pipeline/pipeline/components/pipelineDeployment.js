import React from 'react'
import SourceCode from "./editDeploymnet/SourceCode";
import Build from "./editDeploymnet/build";
import Deploy from "./editDeploymnet/deploy";
import {Breadcrumb, Button} from "antd";
import {withRouter} from "react-router-dom"

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById("box");
        let a = document.getElementById(anchorName)
        if (anchorElement) {
            console.log(anchorElement.scrollTop,a.offsetTop)
            anchorElement.scrollTop = a.offsetTop -200;
        }
    }
}
const  handleScroll=()=>{
    let scrollTop = document.getElementById("box").scrollTop;  //滚动条滚动高度
    let lis=document.getElementsByClassName("a")
    if(scrollTop>16 && scrollTop<=115){
        lis.item(0).classList.add("ac")
        lis.item(1).classList.remove("ac")
        lis.item(2).classList.remove("ac")
    }
    if(scrollTop>120 && scrollTop<240){
        lis.item(1).classList.add("ac")
        lis.item(0).classList.remove("ac")
        lis.item(2).classList.remove("ac")
    }

    if(scrollTop>240 ){
        lis.item(2).classList.add("ac")
        lis.item(0).classList.remove("ac")
        lis.item(1).classList.remove("ac")
    }
}

const PipelineDeployment= props=>{
    const route=props.location
    return (
        <div className='newDeployment' >
            <Breadcrumb separator=">">
                <Breadcrumb.Item>流水线</Breadcrumb.Item>
                <Breadcrumb.Item href="">{route.state.pipelineName}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='newDeployment-bottom'>
                <div className='newDeployment-tab'>
                    <ul>
                        <li className='ac a '>
                            <a  onClick={()=>scrollToAnchor('a1')}>
                                源码管理
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('a2')}>
                                构建
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('a3')}>
                                部署
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='newDeployment-bc'>
                    <div className='newDeployment-con' id='box' onScroll={handleScroll} >
                        <div id="a1" ><SourceCode /></div>
                        <div id="a2">
                            <Build />
                        </div>
                        <div id="a3"><Deploy/></div>
                        <div style={{backgroundColor:"white",height:100}} />
                    </div>
                    <div className={'btn'}>
                        <Button type='primary' style={{marginLeft:30,marginRight:30}}
                        > 保存</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withRouter(PipelineDeployment)