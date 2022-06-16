import React from "react";
import {Button, List, Table} from "antd";

const AgencyMatters = props =>{

    const data = [
        {
            key:'1',
            proofType:'1',
            proofName:'2124124pipeline',
            username:'pipeline',
            proofCreateTime:'重新执行'
        },
        {
            key:'2',
            proofType:'1',
            proofName:'2124124pipeline',
            username:'pipeline',
            proofCreateTime:'重新执行'
        }
    ]

    const headData = [
        {
            title:'序号',
        },
        {
            title:'时间',
        },
        {
            title:'项目',
        },
        {
            title:'任务信息',
        },
    ]

    return(
        <div className='homePage-content-agencyMatters'>
            <div className='agencyMatters-top'>
                <div className='agencyMatters-top-title'>待办事项</div>
                <div className='agencyMatters-top-action'>
                    <Button>添加</Button>
                    <Button>编辑</Button>
                </div>
            </div>
            <div className='agencyMatters-bottom'>
                <List
                    size="large"
                    header={
                        <div  className='agencyMatters-bottom-listHeader'>
                        { headData.map(item=><div key={item.title}>{item.title}</div>) }
                        </div>
                    }
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item >
                       <div  className='agencyMatters-bottom-listHeader'>
                           <div>{item.proofType}</div>
                           <div>{item.proofName}</div>
                           <div>{item.username}</div>
                           <div>{item.proofCreateTime}</div>
                       </div>
                    </List.Item>}
                />
            </div>
        </div>
    )
}

export default AgencyMatters