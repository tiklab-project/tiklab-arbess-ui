import React,{useState} from "react";
import {Select} from "antd";
import FormsSelect from "../FormsSelect";
import xpackStore from "../../../store/XPackStore";

export const ArtifactXpack = props =>{

    const {label,dataItem,onChange} = props

    const {findXPackRpy} = xpackStore

    // 推送地址获取加载状态
    const [isSpin,setSpin] = useState(false);

    // 仓库
    const [xpackRpy,setXpackRpy] = useState(false);

    const onFocus = () => {
        if(!dataItem.task?.authId) return;
        setSpin(true)
        findXPackRpy(dataItem.task?.authId).then(r=>{
            if(r.code===0){
                setXpackRpy(r.data)
            }
            setSpin(false)
        })
    }

    return (
        <FormsSelect
            rules={[{required:true, message:`${label}不能为空`}]}
            name={"putAddress"}
            label={label}
            isSpin={isSpin}
            onFocus={onFocus}
            onChange={e=>onChange(e,'putAddress')}
        >
            {
                xpackRpy && xpackRpy.map(item=>{
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                })
            }
        </FormsSelect>
    )

}
