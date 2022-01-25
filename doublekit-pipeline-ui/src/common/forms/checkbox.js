import React,{ useState, useEffect } from "react";
import { Checkbox, Row, Col, } from "antd";
import { observer, inject } from "mobx-react";

const SelfCheckbox = (props) => {
    const { onChange,value,selectItemList } = props;
    const [checkboxValue,setCheckboxValue] = useState()
    const onChangeCheckbox = (values) => {
        setCheckboxValue(values)
        onChange(values)
    }

    return (
        <Checkbox.Group onChange = {onChangeCheckbox} value={value || checkboxValue}>
            <Row >
                {
                    selectItemList && selectItemList.map((item)=> {
                        return <Col span={8} key={item.id}>
                                    <Checkbox value={item.id} key={item.id} style={{ lineHeight: '32px' }}>
                                        {item.name}
                                    </Checkbox>
                                </Col>
                    })
                }
            </Row>
        </Checkbox.Group>
    )
    
}

export default SelfCheckbox;
