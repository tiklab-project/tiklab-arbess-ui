import React, {useEffect,useState} from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import PipelineTable from "../../pipelineTable/pipelineTable";
import View from "../../../view/view";
import {getUser} from 'doublekit-core-ui';
import {PlusOutlined} from '@ant-design/icons'
import {Button} from "antd";

const PipelineTabs = props =>{

    const {pipelineStore}=props

    const {findAllPipelineStatus,pipelineList}=pipelineStore
    const [fresh,setFresh] = useState(false)
    const [type,setType] = useState(1)
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
            findAllPipelineStatus(getUser().userId)
    },[fresh])

    const lis = [
        {
            id:1,
            title:'所有'
        },
        {
            id:2,
            title:'我的'
        }
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className='pipeline-tabs'>
            <div className='pipeline-tabs-type'>
                <div className='pipeline-tabs-type-group'>
                    {
                        lis.map(item=>{
                            return(
                                <div key={item.id}
                                     className={type === item.id ? 'pipeline-tabs-type-active pipeline-tabs-type-link' : 'pipeline-tabs-type-link'}
                                     onClick={()=>onclick(item)}
                                >
                                    {item.title}
                                </div>
                            )
                        })
                    }
                    <div className='pipeline-tabs-type-link' onClick={()=>setVisible(true)}>
                        新建视图
                    </div>
                </div>
            </div>
            <PipelineTable
                list={pipelineList}
                fresh={fresh}
                setFresh={setFresh}
            />
            <View
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    )
}

export default withRouter(inject('pipelineStore')(observer(PipelineTabs)))
