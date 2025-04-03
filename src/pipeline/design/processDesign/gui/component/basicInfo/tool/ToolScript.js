/**
 * @Description: 脚本命令
 * @Author: gaomengyuan
 * @Date: 2025/4/1
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/1
 */
import React from "react";
import FormsMirror from "../FormsMirror";
import FormsSelect from "../FormsSelect";
import {Select} from "antd";
import {observer} from "mobx-react";

const ToolScript = (props) => {

    const {taskStore} = props

    const {dataItem,updateTask} = taskStore;

    /**
     * 脚本类型
     */
    const changType = (value,type)=>{
        updateTask({[type]:value})
    }

    return (
        <>
            <FormsSelect
                name={"type"}
                label={"脚本类型"}
                onChange={e=>changType(e,'type')}
            >
                <Select.Option value={'bash'}>bash</Select.Option>
                <Select.Option value={'cmd'}>cmd</Select.Option>
            </FormsSelect>
            <FormsMirror
                name={"scriptOrder"}
                label={"脚本命令"}
                placeholder={"脚本命令"}
                language={dataItem.task?.type==='bash' ? 'shell' : 'bat'}
            />
        </>
    )
}

export default observer(ToolScript)

