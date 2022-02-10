import React from 'react'
import SourceCodeNewDeployment from "./pages/sourceCode";
import StructureNewDeployment from "./pages/structure";
import DeployNewDeployment from "./pages/deploy/deploy";
import NewDeploymentHeader from "./components/header";
import {Button } from "antd";

const Deployment=()=>{
    //锚点滚动
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById("box");
            let a = document.getElementById(anchorName)
            if (anchorElement) {
                anchorElement.scrollTop = a.offsetTop -200;
            }
        }
    }
    //滚动监听
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
    return (
        <div className='newDeployment' >
            <NewDeploymentHeader/>
            <div className='newDeployment-bottom'>
                <div className='newDeployment-tab'>
                    <ul className='_cf'>
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
                        <div id="a1" ><SourceCodeNewDeployment /></div>
                        <div id="a2"> <StructureNewDeployment/></div>
                        <div id="a3"><DeployNewDeployment/></div>
                        <div style={{backgroundColor:"white",height:700}} />
                    </div>
                    <div className={'btn'}>
                        <Button type='primary' style={{marginLeft:30,marginRight:30}}> 保存</Button>
                        <Button>取消</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Deployment