import React,{ useState, useEffect } from "react";
import { Radio } from "antd";
import { observer, inject } from "mobx-react";

const SelfRadio = (props) => {
    const { onChange,value,selectItemList } = props;
    const [radioValue,setRadioValue] = useState()
    const onChangeRadio = (values) => {
        setRadioValue(values)
        onChange(values)
    }

    return (
        <Radio.Group name="radiogroup" defaultValue={1} onChange={onChangeRadio} value={value || radioValue}>
        {
            selectItemList && selectItemList.map((item)=> {
                return <Radio value={item.id} key = {item.id}>{item.name}</Radio>
            })
        }
        </Radio.Group>
    )
    
}

export default SelfRadio;
