import React,{useContext} from "react";
import {Space} from "antd";
import TestContext from "./testContext";
import {observer} from "mobx-react";

const AddDrawerRight = props =>{

    const {lis,onScroll,setNewStageDrawer} = props

    const context = useContext(TestContext)
    const {setCodeType,setTestType,setBuildType,setDeployType,setScanType,setGoodsType} = context.configDataStore
    const addConfig = context.addConfig

    const handleClick = (group,item) =>{
        addConfig(item.type)
        switch (group.id) {
            case 1:setCodeType(item.type)
                break
            case 2:
                setTestType(item.type)
                break
            case 3:
                setBuildType(item.type)
                break
            case 4:
                setDeployType(item.type)
                break
            case 5:
                setScanType(item.type)
                break
            case 6:
                setGoodsType(item.type)
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
                                                    <Space>
                                                        <svg className="icon" aria-hidden="true">
                                                            <use xlinkHref={`#icon-${item.icon}`}/>
                                                        </svg>
                                                        {item.tel}
                                                    </Space>                                           
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