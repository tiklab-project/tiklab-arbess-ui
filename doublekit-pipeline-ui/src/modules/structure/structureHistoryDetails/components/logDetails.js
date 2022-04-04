import React ,{useEffect} from 'react'
import { Drawer } from 'antd';

const LogDetails = props =>{

    const {visible,setVisible,drawer,historyLog} = props

    const logRun = () =>{
       if(historyLog){
           switch (drawer) {
               case 'clone' :
                   return <div style={{whiteSpace: 'pre-wrap'}}>
                                {historyLog.codeLog && historyLog.codeLog.codeRunLog}
                          </div>
               case 'deploy' :
                   return <div style={{whiteSpace: 'pre-wrap'}}>
                              {historyLog.deployLog && historyLog.deployLog.deployRunLog}
                          </div>
               case 'structure' :
                   return <div style={{whiteSpace: 'pre-wrap'}}>
                              {historyLog.structureLog && historyLog.structureLog.structureRunLog}
                          </div>
               case 'test' :
                   return <div style={{whiteSpace: 'pre-wrap'}}>
                              {historyLog.testLog && historyLog.testLog.testRunLog}
                          </div>
           }
       }else {
           return <div>
                      没有数据
                  </div>
       }
    }



    return(
        <Drawer
            placement="bottom"
            visible={visible}
            onClose={()=>setVisible(false)}
        >
            {logRun()}
        </Drawer>
   )
}

export default LogDetails