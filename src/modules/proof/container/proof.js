import React,{useState} from "react";
import './proof.scss';
import {Button, Popconfirm, Table} from "antd";
import {inject,observer} from "mobx-react";
import AddProofButton from "../components/addProofButton";
import UpdateProof from "../components/updateProof";

const Proof = props =>{

    const {proofList,proofStore,setFresh,fresh} = props
    const {updateProof,deleteProof} = proofStore

    const [formValue,setFormValue] = useState('')
    const [visible,setVisible] = useState(false)

    const edit = (text,record) => {
        setFormValue(record)
        setVisible(true)
    }

    const del = (text,record) => {
        deleteProof(record.proofId).then(()=>{
            setFresh(!fresh)
        }).catch(error=>{
            console.log(error)
        })
    }

    const columns = [
        {
            title:'作用域',
            dataIndex:'type',
            key:'type',
            render:text => {
                switch (text) {
                    case 1:
                        return '全局凭证'
                    default:
                        return '项目凭证'
                }
            }
        },
        {
            title:'类型',
            dataIndex:'proofType',
            key:'proofType'
        },
        {
            title:'名称',
            dataIndex:'proofName',
            key:'proofName'
        },
        {
            title:'拥有者',
            dataIndex:'username',
            key:'username',
        },
        {
            title:'创建时间',
            dataIndex:'proofCreateTime',
            key:'proofCreateTime'
        },
        {
            title:'备注',
            dataIndex:'proofDescribe',
            key:'proofDescribe'
        },
        {
            title:'操作',
            dataIndex:'action',
            key:'action',
            render:(text,record)=>{
                return(
                    <span className='pipelineSys-proof-content-action'>
                        <span className='action- edit'
                              onClick={()=>edit(text,record)}
                        >
                            编辑
                        </span>
                         <Popconfirm
                             style={{marginTop:100}}
                             title="你确定删除吗"
                             onConfirm={()=>del(text,record)}
                             okText="确定"
                             cancelText="取消"
                         >
                             <span className='action- del'>
                                 删除
                             </span>
                         </Popconfirm>
                    </span>
                )
            }
        }
    ]

    const style = 'primary'
    return(
        <div className='proof'>
            <div className='proof-content'>
                <div className='proof-content-btn'>
                    <AddProofButton codeType={31} style={style}/>
                </div>
                <Table
                    bordered
                    rowKey={record => record.proofId}
                    columns={columns}
                    dataSource={proofList}
                    pagination={{ pageSize: 12}}
                />
            </div>
            <UpdateProof
                visible={visible}
                setVisible={setVisible}
                formValue={formValue}
                updateProof={updateProof}
                setFresh={setFresh}
                fresh={fresh}
            />
        </div>
    )
}

export default inject('proofStore')(observer(Proof))