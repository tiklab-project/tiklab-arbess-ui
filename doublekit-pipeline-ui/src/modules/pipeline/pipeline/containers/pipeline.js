import React  from "react";
import PipelineHeader from "../components/pipelineHeader";
import My from "../components/pipelineMy";
import All from "../components/pipelineAll";
import {Button, Tabs} from 'antd';
import {withRouter} from "react-router-dom";

const { TabPane } = Tabs;

const Pipeline = props =>{
    return(
        <div className='pipeline'>
            <div className='pipeline-top'>
                <PipelineHeader />
            </div>
            <Tabs type="card">
                <TabPane tab="所有视图" key="1">
                    <All/>
                </TabPane>
                <TabPane tab="我的" key="2">
                    <My/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default withRouter(Pipeline)