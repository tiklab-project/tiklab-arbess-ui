import React,{useState,useEffect} from "react";
import {Modal,Tree} from "antd";
import {SwapOutlined} from "@ant-design/icons";
import ModalTitle from "../../../../common/modalTitle/modalTitle";

const ChangeConfigSortsModal = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData,updateConfigure,pipelineId} = props

    const [gData,setGData] = useState([])

    const nameArray = []
    useEffect(()=>{
        dataTile(data)
        setGData([...nameArray])
    },[data])
    
    const dataTile = data => {
        data && data.map((item,index)=>{
            let tpl,title,icon
            switch (item.dataType) {
                case 11:
                    tpl = "单元测试"
                    title = "测试"
                    icon="ceshi1"
                    break
                case 21:
                    tpl = "maven"
                    title = "构建"
                    icon="goujiangongju"
                    break
                case 22:
                    tpl = "node"
                    title = "构建"
                    icon="goujiangongju"
                    break
                case 31:
                    tpl = "虚拟机"
                    title = "部署"
                    icon="bushubanben"
                    break
                case 32:
                    tpl = "docker"
                    title = "部署"
                    icon="bushubanben"
            }
            nameArray.push({
                key:index+1,
                title:title + "--" + tpl,
                icon:<svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-${icon}`} />
                    </svg>,
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

        const params = {
            message:"order",
            pipelineId,
            sort:dragKey+1,
            taskSort:dropKey+1,
            taskType:1,
        }
        updateConfigure(params).then(res=>{
            //如果改变控件，然后改变data
            if(res.code===0){
                let cData = []
                mData && mData.map(item=>{
                    if(item.step!=="源码管理"){
                        cData.push({
                            dataId:item.dataId,
                            dataType:item.dataType
                        })
                        setData(cData)
                    }
                })
                setChangeSortVisible(false)
            }
        })
    }

    return (
        <Modal
            closable={false}
            onCancel={()=>setChangeSortVisible(false)}
            visible={changeSortVisible}
            footer={null}
        >
            <ModalTitle
                setVisible={setChangeSortVisible}
                title={"更改配置顺序"}
            />
            <div className="changeSorts-tree">
                <Tree
                      showIcon
                      draggable // 是否可拖拽
                      blockNode  // 是否占据一行
                      onDrop={onDrop}
                      treeData={gData}
                />
            </div>
        </Modal>
    )
}

export default ChangeConfigSortsModal