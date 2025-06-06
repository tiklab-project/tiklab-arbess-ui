/**
 * @Description: 程序地址
 * @Author: gaomengyuan
 * @Date: 2025/2/8
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/2/8
 */
import React, {useEffect, useState} from "react";
import FormsSelect from "./FormsSelect";
import {Divider, Select} from "antd";
import {inject, observer} from "mobx-react";
import toolStore from "../../../../../../setting/integration/tool/store/ToolStore";
import ToolAddBtn from "../../../../../../setting/integration/tool/components/ToolAddBtn";
import {scmNameSuffix, scmTitle} from "../../../../../../setting/integration/tool/components/ToolCommon";

const FormsTool = (props) => {

    const {taskStore,scmType}=props;

    const {updateTask} = taskStore;
    const {findPipelineScmList} = toolStore;

    //地址数据
    const [scmList,setScmList] = useState([]);
    //下拉框状态
    const [open,setOpen] = useState(false);
    //添加地址弹出框
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
       //获取程序地址
        findScm()
    },[])

    /**
     * 获取程序地址
     */
    const findScm = () => {
        findPipelineScmList({scmType}).then(res=>{
            if(res.code===0){
                setScmList(res.data)
            }
        })
    }

    //名称
    const nameSuffix = `tool${scmNameSuffix[scmType]}`;
    //标签
    const label = `${scmTitle[scmType]}版本`;

    /**
     * 更新程序地址
     * @param value
     */
    const changeToolSelect = (value) => {
        updateTask({[nameSuffix]: {scmId:value}})
    }

    return (
        <FormsSelect
            name={[nameSuffix,'scmId']}
            label={label}
            placeholder={`请选择${label}`}
            open={open}
            onDropdownVisibleChange={(visible)=>setOpen(visible)}
            dropdownRender={menu=> (
                <>
                    {menu}
                    <Divider style={{margin:"4px 0"}} />
                    <div style={{cursor:"pointer"}} onClick={()=>setOpen(false)}>
                        <ToolAddBtn
                            isConfig={true}
                            visible={visible}
                            setVisible={setVisible}
                            findAllScm={findScm}
                            scmType={scmType}
                        />
                    </div>
                </>
            )}
            rules={[{required:true,message:`${label}不能为空`}]}
            onChange={changeToolSelect}
        >
            {
                scmList && scmList.map(item=>{
                    return (
                        <Select.Option value={item.scmId} key={item.scmId}>
                            {item.scmName}({item.scmAddress})
                        </Select.Option>
                    )
                })
            }
        </FormsSelect>
    )
}

export default inject("taskStore")(observer(FormsTool))
