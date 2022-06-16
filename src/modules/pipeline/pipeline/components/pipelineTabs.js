import React, {useEffect,useState} from "react";
import {Tabs} from "antd";
import './pipelineTabs.scss';
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import PipelineTable from "../../pipelineTable/pipelineTable";
import {getUser} from 'doublekit-core-ui';

const { TabPane } = Tabs;

const PipelineTabs = props =>{

    const {pipelineStore}=props

    const {findAllPipelineStatus,pipelineList}=pipelineStore
    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
            findAllPipelineStatus(getUser().userId)
    },[fresh])

    return(
        <Tabs className='pipeline-tabs'>
            <TabPane tab="全部" key="1">
                <PipelineTable
                    list={pipelineList}
                    fresh={fresh}
                    setFresh={setFresh}
                />
            </TabPane>
            <TabPane tab="我的" key="2">
                <PipelineTable
                    list={pipelineList}
                    fresh={fresh}
                    setFresh={setFresh}
                />
            </TabPane>

        </Tabs>
    )
}

export default withRouter(inject('pipelineStore')(observer(PipelineTabs)))
