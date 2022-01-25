import React,{ useState, useEffect } from "react";
import { Select } from "antd";
import { observer, inject } from "mobx-react";

const SelfSelect = (props) => {
    const { onChange,value,selectItemList} = props;
    
    const [radioValue,setSelectValue] = useState()
    const onChangeSelect = (values) => {
        setSelectValue(values)
        onChange(values)
    }

    return (
        <Select onChange={onChangeSelect} value={ value || radioValue}>
        {
            
            selectItemList && selectItemList.map((item,index)=> {
                return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
            })
        }
        </Select>
    )
    
}

export default SelfSelect;
