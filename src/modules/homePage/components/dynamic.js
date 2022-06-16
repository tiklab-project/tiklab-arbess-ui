import React from "react";
import {Button, List} from "antd";

const Dynamic = props =>{

    const data = [
        {
            key:'1',
            proofCreateTime:'重新执行'
        },
        {
            key:'2',
            proofCreateTime:'重新执行'
        }
    ]

    return(
        <div className='homePage-content-dynamic'>
            <div className='dynamic-top'>
                <div className='dynamic-top-title'>动态</div>
            </div>
            <div className='dynamic-bottom'>
                <List
                    size="large"
                    bordered
                    dataSource={data}
                    renderItem={(item,index) => <List.Item >
                        <div  className='dynamic-bottom-listHeader'>
                            <div>{index+1}、{item.proofCreateTime}</div>
                        </div>
                    </List.Item>}
                />
            </div>
        </div>
    )
}

export default Dynamic