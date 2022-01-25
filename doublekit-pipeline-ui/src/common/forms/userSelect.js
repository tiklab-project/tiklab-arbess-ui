import React,{ useState, useEffect } from "react";
import {Select } from "antd";
import { observer, inject } from "mobx-react";
const { Option } = Select;

const UserSelect = (props) => {
    const { wikiStore,selectKey,onChange,value } = props;
    const { getUseList,uselist } = wikiStore;
    const [selectValue,setSelectValue] = useState()
    const handleChange = (values) => {
        console.log(`selected ${values}`);
        setSelectValue(values)
        onChange(values)
    }

    useEffect(() => {
        getUseList()
        return ;
    }, [])

    return (
        <Select placeholder="请选择人员" onChange={handleChange} key={selectKey} value={value || selectValue}>
            {
                uselist && uselist.map((item,index)=> {
                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                })
            }
        </Select>
    )
    
}

export default inject("wikiStore")(observer(UserSelect));