import React,{Component}  from "react";
import PipelineHeader from "./components/pipelineHeader";
import PipelineMy from "./pages/my";
import PipelineAll from "./pages/all";
import {Button, Tabs} from 'antd';
import {withRouter} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";

const { TabPane } = Tabs;
class Pipeline extends Component{
    render(){
        return(
            <div className='pipeline'>
                <div className='pipeline-top'>
                    <PipelineHeader/>
                </div>
                <Tabs type="card">
                    <TabPane tab="所有视图" key="1">
                        <PipelineAll/>
                    </TabPane>
                    <TabPane tab="我的" key="2">
                        <PipelineMy/>
                    </TabPane>
                </Tabs>
                <div className='pipeline-add'>
                    <Button onClick={()=>this.props.history.push('/system')}>
                        <PlusOutlined/>
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Pipeline)