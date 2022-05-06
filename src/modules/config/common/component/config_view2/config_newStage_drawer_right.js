import React from "react";
import {message} from "antd";

const Config_newStage_drawer_right = props =>{

    const {rightLis,onScroll,setNewStageDrawer,setTaskFormDrawer,setNewStage,
        data,setData,setIsPrompt
    } = props

    const handleClick = (group,item,index) =>{
        const newData = [...data]
        const name = data && data.map(item => item.desc);
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
        newData.push({
            dataId:index,
            title:group.title,
            desc:item.tpl
        })
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
                                                <div
                                                    key={index}
                                                    className='group-desc'
                                                    onClick={()=>handleClick(group,item,groupIndex)}
                                                >
                                                    <div className='group-desc-tpl'>
                                                        <div className='tpl'>
                                                            {item.tpl}
                                                        </div>
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

export default Config_newStage_drawer_right