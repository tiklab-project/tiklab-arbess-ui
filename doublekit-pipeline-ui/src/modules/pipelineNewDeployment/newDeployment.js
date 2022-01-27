import React from 'react'
import SourceCodeNewDeployment from "./pages/sourceCode";
import StructureNewDeployment from "./pages/structure";
import ActionNewDeployment from "./pages/action";
import NewDeploymentHeader from "./components/header";
import {Button,Tabs } from "antd";

const { TabPane } = Tabs;
/*
 *新建配置
 */
const NewDeployment = ()=>{
    const  scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'}); }
        }
    }
    return(
       <div className='newDeployment' >
           <NewDeploymentHeader/>
          <div className='newDeployment-bottom'>
              <div className='newDeployment-tab'>
                 <Tabs defaultActiveKey="1">
                         <TabPane
                             key="1"
                             tab={
                             <div  onClick={()=>scrollToAnchor('1')}>
                                 源码管理
                             </div>
                             }
                         />
                         <TabPane
                             key="2"
                             tab={
                                 <div  onClick={()=>scrollToAnchor('2')}>
                                    构建
                                 </div>
                             }
                         />
                         <TabPane
                             key="3"
                             tab={
                                 <div  onClick={()=>scrollToAnchor('3')}>
                                    部署
                                </div>
                             }
                         />
                     </Tabs>
             </div>
              <div className='newDeployment-bc' >
                  <div className='newDeployment-con' >
                      <div id='1'>
                          <SourceCodeNewDeployment />
                      </div>
                      <div id='2'>
                          <StructureNewDeployment/>
                      </div>
                      <div id='3'>
                          <ActionNewDeployment/>
                      </div>
                  </div>
                  <Button type='primary' style={{marginLeft:30,marginRight:30}}> 保存</Button>
                  <Button>取消</Button>
              </div>

           </div>
       </div>
    )
}
export default NewDeployment