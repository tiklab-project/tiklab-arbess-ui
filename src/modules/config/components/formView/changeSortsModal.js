import React,{useState,useEffect} from "react";
import {Modal,Tree,message} from "antd";
import {BorderVerticleOutlined} from "@ant-design/icons";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";

const ChangeSortsModal = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData,updateConfigure,pipelineId} = props

    const [gData,setGData] = useState([])
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const nameArray = []
    useEffect(()=>{
        dataTile(data)
        setGData([...nameArray])
    },[data])

    const renderTitle = type =>{
        switch (type) {
            case 1:return "源码-通用Git"
            case 2:return "源码-Gitee"
            case 3:return "源码-Github"
            case 4:return "源码-Gitlab"
            case 5:return "源码-svn"
            case 11:return "测试-单元测试"
            case 21:return "构建-maven"
            case 22:return "构建-node"
            case 31:return "部署-虚拟机"
            case 32:return "部署-docker"
            case 41:return "代码扫描-sonarQuebe"
            case 51:return "推送制品-nexus"
            case 52:return "推送制品-SSH"
            default:return null
        }
    }

    const dataTile = data => {
        data && data.map((item,index)=>{
            item.dataType<10 && nameArray.push({
                key:index,
                title:renderTitle(item.dataType),
                dataId:item.dataId,
                dataType:item.dataType,
                disabled:true
            })
            item.dataType>10 && nameArray.push({
                key:index,
                title:renderTitle(item.dataType),
                dataId:item.dataId,
                dataType:item.dataType
            })
        })
    }

    const onDrop = info => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split("-");
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (mData, key, callback) => {
            for (let i = 0; i < mData.length; i++) {
                if (mData[i].key === key) {
                    return callback(mData[i], i, mData);
                }
            }
        };
        const mData = [...gData];
        let dragObj;
        loop(mData, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        let ar;
        let i;
        loop(mData, dropKey, (item, index, arr) => {
            ar = arr;
            i = index;
        });
        if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
        } else {
            ar.splice(i + 1, 0, dragObj);
        }
        setGData(mData)
        updateConfig(mData,dragKey+1,dropKey+1)
    }

    const updateConfig = (mData,sort,taskSort) =>{
        const params = {
            message:"order",
            pipeline:{pipelineId},
            sort:sort,
            taskSort:taskSort,
            taskType:1,
        }
        updateConfigure(params).then(res=>{
            //如果改变控件，然后改变data
            if(res.code===0){
                setData([...mData])
            }
            if(res.code===50001){
                message.info(res.msg)
            }
            setChangeSortVisible(false)
        })
    }

    return (
        <Modal
            closable={false}
            onCancel={()=>setChangeSortVisible(false)}
            visible={changeSortVisible}
            footer={null}
            style={{height:height,top:60}}
            className="mf"
        >
            <ModalTitle
                setVisible={setChangeSortVisible}
                title={"更改顺序"}
            />
            <div className="changeSorts-tree" style={{height:"calc(100% - 150)",overflow:"auto"}}>
                <Tree
                    showIcon
                    showLine={false}
                    icon={<BorderVerticleOutlined style={{fontSize:16}}/>}
                    className="draggable-tree"
                    draggable
                    blockNode
                    onDrop={onDrop}
                    treeData={gData}
                />
            </div>
        </Modal>
    )
}

export default ChangeSortsModal