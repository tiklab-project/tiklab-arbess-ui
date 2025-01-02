import React, {useState} from "react";
import {Form,Select, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import ListEmpty from "../../../../../../common/component/list/ListEmpty";

/**
 * 下拉框
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const FormsSelect = props => {

    const {name,rules,label,isSpin,children,...res} = props

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
            >
                {children}
            </Select>
        </Form.Item>
    )
}

export default FormsSelect
