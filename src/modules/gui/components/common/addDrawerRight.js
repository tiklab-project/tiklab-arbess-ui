import React,{useContext} from "react";
import TestContext from "./testContext";
import {observer} from "mobx-react";

const AddDrawerRight = props =>{

    const {lis,onScroll,setNewStageDrawer} = props

    const context = useContext(TestContext)
    const {setCodeType,setBuildType,setDeployType} = context.configDataStore
    const addConfig = context.addConfig

    const handleClick = (group,item) =>{
        addConfig(item.type)
        if(group.id===1){
            setCodeType(item.type)
        }
        else if(group.id===3){
            setBuildType(item.type)
        }
        else if(group.id===4){
            setDeployType(item.type)
        }
        setNewStageDrawer(false)
    }

    return(
        <div className="guiViewAddDrawerRight" id="tpl-list-task" onScroll={onScroll}>
            <div className="wrap" >
                {
                    lis && lis.map((group,groupIndex)=>{
                        return(
                            <div className="group" key={group.id} id={groupIndex+1}>
                                <div className="group-title">{group.title}</div>
                                <div className="group-content">
                                    {
                                        group.desc && group.desc.map((item,index)=>{
                                            return(
                                                <div key={index}
                                                     className="group-desc"
                                                     onClick={()=>handleClick(group,item)}
                                                >
                                                    <div className="group-desc-tpl">
                                                        <div className="group-tpl">{item.title}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default observer(AddDrawerRight)