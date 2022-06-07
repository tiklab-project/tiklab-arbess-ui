import React, {useState} from "react";
import StructureRightLogDrawer from './structureRightLogDrawer'
import StructureRightExecute from "./structureRightExecute";
import StructureRightItem from "./structureRightItem";

const StructureRight = props =>{

    const {rightData,details,status,historyId,deleteHistoryLog,forceUpdate,modeData,index,leftExecute,killInstance,
        rightExecute
    } = props
    
    const [visible,setVisible] = useState(false)
    const [drawerContent,setDrawerContent] = useState('')

    const configName = i =>{
        switch (i) {
            case 1:
                return '通用Git'
            case 2:
                return 'Gitee'
            case 3:
                return 'Github'
            case 4:
                return 'Gitlab'
            case 11:
                return '单元测试'
            case 21:
                return 'maven'
            case 22:
                return 'node'
            case 31:
                return 'linux'
            case 32:
                return 'docker'
        }
    }

    const runWay = i => {
        switch (i) {
            case 1:
                return '手动'
            default:
                return  '自动'
        }
    }

    return(
        <div className='structure-content-right'>
            <div className='structure-content-right-mid'>
                {
                    details === 0 ?
                        <StructureRightExecute
                            rightExecute={rightExecute}
                            rightData={rightData}
                            status={status}
                            index={index}
                            leftExecute={leftExecute}
                            setDrawerContent={setDrawerContent}
                            setVisible={setVisible}
                            killInstance={killInstance}
                            configName={configName}
                            runWay={runWay}
                        />
                        :
                        <StructureRightItem
                            rightData={rightData}
                            status={status}
                            forceUpdate={forceUpdate}
                            modeData={modeData}
                            index={index}
                            setVisible={setVisible}
                            setDrawerContent={setDrawerContent}
                            historyId={historyId}
                            deleteHistoryLog={deleteHistoryLog}
                            configName={configName}
                            runWay={runWay}
                        />
                }
            </div>

            <StructureRightLogDrawer
                visible={visible}
                setVisible={setVisible}
                drawerContent={drawerContent}
                configName={configName}
            />

        </div>
    )
}

export default StructureRight