import React,{useState,useEffect} from "react";
import {Button,Modal,Tree} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ModalTitle from "../../../common/modalTitle/modalTitle";

const ChangeConfigSortsModal = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData,codeType,setIsPrompt} = props

    const [gData,setGData] = useState([])

    const nameArray = []
    useEffect(()=>{
        codeTitle(codeType)
        dataTile(data)
        setGData([...nameArray])
    },[data,codeType])
    
    const codeTitle = codeType => {
        let desc
        if(codeType){
            switch (codeType) {
                case 1:desc = "通用Git"
                    break
                case 2:desc = "Gitee"
                    break
                case 3:desc = "Github"
                    break
                case 4:desc = "Gitlab"
                    break
                case 5:desc = "SVN"
            }
            nameArray.push({
                key:0,
                title: "源码管理" + "--" + desc,
                disabled: true,
                step:"源码管理"
            })
        }
    }
    
    const dataTile = data => {
        data && data.map((item,index)=>{
            let tpl,title
            switch (item.dataType) {
                case 11:
                    tpl = "单元测试"
                    title = "测试"
                    break
                case 21:
                    tpl = "maven"
                    title = "构建"
                    break
                case 22:
                    tpl = "node"
                    title = "构建"
                    break
                case 31:
                    tpl = "虚拟机"
                    title = "部署"
                    break
                case 32:
                    tpl = "docker"
                    title = "部署"
            }
            nameArray.push({
                key:index+1,
                title:title + "--" + tpl,
                dataId:item.dataId,
                step:title,
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

        //如果改变控件，然后改变data
        let cData = []
        mData && mData.map(item=>{
            if(item.step!=="源码管理"){
                cData.push({
                    dataId:item.dataId,
                    dataType:item.dataType
                })
                setData(cData)
                setIsPrompt(true)
            }else {
                setIsPrompt(false)
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