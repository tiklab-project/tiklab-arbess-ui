import React from "react";
import {Tabs} from "antd";
import './pipelineTabs.scss'
import PipelineTabs_all from "./pipelineTabs_all";
import PipelineTabs_my from "./pipelineTabs_my";

const { TabPane } = Tabs;

const PipelineTabs = props =>{

    return(
        <Tabs className='pipeline-tabs'>
            <TabPane tab="所有视图" key="1">
                <PipelineTabs_all/>
            </TabPane>
            <TabPane tab="我的" key="2">
                <PipelineTabs_my/>
            </TabPane>
        </Tabs>
    )
}

export default PipelineTabs