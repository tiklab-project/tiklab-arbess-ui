import React,{Component} from "react";
import { Layout } from 'antd';
import TaskHeader from "./components/taskHeader";
import LeftNav from "./components/taskLeftNav";
import {taskRouter} from "./routes/taskroutes";
import {Route} from "react-router-dom";

const { Content, Sider } = Layout;

/*
流水线--任务详情
 */
class Task extends  Component{
    render() {
        return(
            <>
                <Layout >
                    <TaskHeader />
                    <Layout>
                       <Sider style={{backgroundColor:"#fff",marginTop:30}}> <LeftNav/></Sider>
                        <Content className='ant-layout-task-content' style={{marginTop:30,marginLeft:30}}>
                            {
                                taskRouter.map(item=>{
                                    return (
                                        <Route key={item.path} path={item.path}
                                               render={routeProps=>{
                                                   return <item.component {...routeProps}/>
                                               }}/>
                                    )})
                            }
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}

export default Task