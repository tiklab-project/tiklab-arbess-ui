import React from "react";
import {message} from "antd";

const ConfigAddNewStageRightDrawer = props =>{

    const {rightLis,onScroll,setNewStageDrawer,setTaskFormDrawer,setNewStage,data,setData,setIsPrompt,index} = props

    const handleClick = (group,item,i) =>{
        const newData = [...data]
        const name = data && data.map(item => item.dataType);
        const groupDesc = group.desc.map(item=>item.tpl)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] === groupDesc[j]){
                    message.info({
                        content: '已经存在',
                        className: 'custom-class',
                        style: {
                            marginTop: '9vh',
                            marginLeft:'5vh'
                        }
                    })
                    return
                }
            }
        }
        if(index === ''){
            newData.push({
                dataId:i,
                title:group.title,
                dataType:item.tpl
            })
        }else {
            newData.splice(index,0,{
                dataId:i,
                title:group.title,
                dataType:item.tpl
            })
        }
        setData(newData)
        setNewStageDrawer(false)
        setTaskFormDrawer(true)
        setNewStage(item.tpl)
        setIsPrompt(true)
    }

    return(
        <div className="body-menu_right" id='tpl-list-task' onScroll={onScroll}>
            <div className="wrap" >
                {
                    rightLis && rightLis.map((group,groupIndex)=>{
                        return(
                            <div className='group' key={group.id} id={groupIndex+1}>
                                <div className='group-title'>{group.title}</div>
                                <div className='group-content'>
                                    {
                                        group.desc &&  group.desc.map((item,index)=>{
                                            return(
                                                <div key={index}
                                                     className='group-desc'
                                                     onClick={()=>handleClick(group,item,groupIndex)}
                                                >
                                                    <div className='group-desc-tpl'>
                                                        <div className='group-tpl'>{item.tel}</div>
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

export default ConfigAddNewStageRightDrawer