import React from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import Mirror from "./mirror";

const TestUnit = props =>{

    const {dataItem} = props

    return(
        <Form.Item name={"testOrder"} label="测试命令"
        >
            <Mirror
                name={"testOrder"}
                mirrorValue={dataItem.testOrder}
                dataItem={dataItem}
                placeholder={"测试命令"}
            />
        </Form.Item>
    )
}

export default observer(TestUnit)