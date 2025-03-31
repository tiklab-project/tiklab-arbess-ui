/**
 * @Description: 任务下拉框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React, {useState} from "react";
import {Form,Select, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import ListEmpty from "../../../../../../common/component/list/ListEmpty";
import {inject, observer} from "mobx-react";
import {pipeline_task_update} from "../../../../../../common/utils/Constant";

const FormsSelect = props => {

    const {taskStore,name,rules,label,isSpin,children,...res} = props

    const {taskPermissions} = taskStore;

    const taskUpdate = taskPermissions?.includes(pipeline_task_update);

    //是否显示下拉图标
    const [showArrow,setShoeArrow] = useState(false)
    //下拉框聚焦
    const [bordered,setBordered] = useState(false)

    const notFoundContent = isSpin ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : <ListEmpty/>

    return (
        <Form.Item name={name} label={label} rules={rules}>
            <Select
                {...res}
                showSearch
                placeholder={bordered ? label:"未选择"}
                className={bordered?'':'input-hover'}
                showArrow={showArrow}
                onMouseEnter={()=>setShoeArrow(true)}
                onMouseLeave={()=>setShoeArrow(false)}
                onFocus={()=>{
                    if (res.onFocus) {
                        res.onFocus();
                    }
                    setBordered(true)
                }}
                onBlur={()=>{
                    if (res.onBlur) {
                        res.onBlur();
                    }
                    setBordered(false)
                }}
                onChange={value=>{
                    if(res.onChange) {
                        res.onChange(value);
                    }
                    setBordered(false)
                }}
                getPopupContainer={e => e.parentElement}
                notFoundContent={notFoundContent}
                filterOption = {(input, option) =>
                    (Array.isArray(option.children) ? option.children.join('') : option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={!taskUpdate}
            >
                {children}
            </Select>
        </Form.Item>
    )
}

export default inject("taskStore")(observer(FormsSelect))

