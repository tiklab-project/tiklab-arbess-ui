import React,{Component} from "react";
import { Breadcrumb } from 'antd';

class NewDeploymentHeader extends Component{
    render() {
        return(
            <>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>流水线</Breadcrumb.Item>
                    <Breadcrumb.Item href="">任务</Breadcrumb.Item>
                </Breadcrumb>
            </>
        )
    }
}
export default NewDeploymentHeader