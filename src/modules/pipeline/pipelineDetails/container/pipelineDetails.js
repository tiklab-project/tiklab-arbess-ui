import React,{Fragment, useEffect,useState} from "react";
import { Layout } from 'antd';
import {renderRoutes} from "react-router-config";
import './pipelineDetails.scss'
import PipelineDetailsBreadcrumb from "../components/pipelineDetailsBreadcrumb";
import PipelineDetails_aside from "../components/pipelineDetails_aside";
import PipelineDetails_left from "../components/pipelineDetails_left";
import { inject,observer } from "mobx-react";

const { Content, Sider } = Layout;

const PipelineDetails= props=>{

    const {route,PipelineStore}=props
    const {findAllPipelineStatus,pipelineList} = PipelineStore

    const [opt,setOpt] = useState(false)

    useEffect(()=>{
        findAllPipelineStatus()
    },[])

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('pipelineName')
            localStorage.removeItem('pipelineId')
        }
    },[])

    return(
      <Fragment>
            {
                opt ? <Layout>
                    <Sider style={{backgroundColor:'#fff',width:'60px'}}>
                        <PipelineDetails_aside/>
                    </Sider>
                    <Content className='pipelineDetails'>
                        <PipelineDetailsBreadcrumb   {...props}/>
                        {renderRoutes(route.routes)}
                    </Content>
                </Layout> :
                <Layout>
                    <PipelineDetails_left 
                        pipelineList={pipelineList}
                    />
                    <Content className='pipelineDetails' style={{marginLeft:60}}>
                        <PipelineDetailsBreadcrumb   {...props} />
                        {renderRoutes(route.routes)}
                    </Content>
                </Layout>
        }
      </Fragment>
    )
}

export default inject('PipelineStore')(observer(PipelineDetails))


