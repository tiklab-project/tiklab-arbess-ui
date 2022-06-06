import React ,{useState,useEffect} from "react";
import {Button, Drawer,Tree} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const ChangeConfigSortsDrawer = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData,codeData,setIsPrompt} = props

    const [gData,setGData] = useState([])

    const nameArray = []
    useEffect(()=>{
        let desc
        if(codeData){
            switch (codeData.codeType) {
                case 1:
                    desc = '通用Git'
                    break
                case 2:
                    desc = 'Gitee'
                    break
                case 3:
                    desc = 'Github'
                    break
                case 4:
                    desc = 'Gitlab'
            }
            nameArray.push({
                key:0,
                title: '源码管理' + '--' + desc,
                // disabled: true,
                step:'源码管理'
            })
        }     
        data && data.map((item,index)=>{
            let tpl
            switch (item.dataType) {
                case 11:
                    tpl = '单元测试'
                    break
                case 21:
                    tpl = 'maven'
                    break
                case 22:
                    tpl = 'node'
                    break
                case 31:
                    tpl = 'linux'
                    break
                case 32:
                    tpl = 'docker'
            }
            nameArray.push({
                key:index+1,
                title:item.title + '--' + tpl,
                dataId:item.dataId,
                step:item.title,
                dataType:item.dataType
            })
         })
        setGData([...nameArray])
    },[data,codeData])

    const onDrop = info => {

        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
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
            if(item.step!=='源码管理'){
                cData.push({
                    dataId:item.dataId,
                    title:item.step,
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
        <Drawer
            placement="right"
            closable={false}
            onClose={()=>setChangeSortVisible(false)}
            visible={changeSortVisible}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div>更改配置顺序</div>
                    <div>
                        <Button type="text" onClick={()=>setChangeSortVisible(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="wrapper-body" style={{padding:20}}>
                    <Tree
                        className="draggable-tree"
                        draggable
                        blockNode
                        onDrop={onDrop}
                        treeData={gData}
                    />
                </div>
            </div>
        </Drawer>
    )
}

export default ChangeConfigSortsDrawer