import React from "react";
import {Form} from "antd";
import Mirror from "../basic/mirror";

const TestUnit = props =>{

    const {dataItem} = props

    return(
        <Form.Item name={"testOrder"} label="测试命令">
            <Mirror
                name={"testOrder"}
                placeholder={"测试命令"}
                dataItem={dataItem}
                mirrorValue={dataItem.testOrder}
            />
        </Form.Item>
    )
}

export default TestUnit
