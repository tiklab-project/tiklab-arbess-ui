import React  from 'react'
import { Drawer } from 'antd';

const LogDetails = props =>{

    const {visible,setVisible,drawer,historyLog} = props

    const logRun = () =>{
       if(historyLog){
           switch (drawer) {
               case 'clone' :
                   return  historyLog.codeLog && historyLog.codeLog.codeRunLog ?
                            historyLog.codeLog.codeRunLog : '没有数据'
               case 'test' :
                   return   historyLog.testLog && historyLog.testLog.testRunLog ?
                            historyLog.testLog.testRunLog : '没有数据'
               case 'structure' :
                   return  historyLog.structureLog && historyLog.structureLog.structureRunLog ?
                            historyLog.structureLog.structureRunLog : '没有数据'
               case 'deploy' :
                   return   historyLog.deployLog && historyLog.deployLog.deployRunLog ?
                            historyLog.deployLog.deployRunLog : '没有数据'
           }
       }else {
           return  '没有数据'
       }
    }

    return(
        <Drawer
            placement='bottom'
            visible={visible}
            onClose={()=>setVisible(false)}
            style={{whiteSpace: 'pre-wrap'}}
        >
            {logRun()}
        </Drawer>
   )
}

export default LogDetails