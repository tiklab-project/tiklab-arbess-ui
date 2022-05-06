import React ,{useState,useEffect} from "react";
import {Button, Drawer,Tree} from "antd";
import './changeConfigSorts_drawer.scss'
import {CloseOutlined} from "@ant-design/icons";

const ChangeConfigSorts_drawer = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData,codeData,setIsPrompt
    } = props

    const [gData,setGData] = useState([])

    const nameArray = []
    
    useEffect(()=>{
        if(codeData!==''){
            nameArray.push({
                key:0,
                title: codeData.title + '--' +codeData.desc ,
                disabled: true,
                step:'源码管理'
            })
        }     
        data && data.map((item,index)=>{
            nameArray.push({
                key:index+1,
                title:item.title + '--' + item.desc,
                dataId:item.dataId,
                step:item.title,
                desc:item.desc
            })
         })
        setGData([...nameArray])
    },[data,codeData])

    const onDrop = info => {
        console.log(info);
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
                    desc:item.desc
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
        >
            <div className='opt_drawer-top'>
                <div>更改配置顺序</div>
                <div>
                    <Button type="text" onClick={()=>setChangeSortVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            </div>
            <div style={{padding:20}}>
                <Tree
                    className="draggable-tree"
                    draggable
                    blockNode
                    onDrop={onDrop}
                    treeData={gData}
                />
            </div>
        </Drawer>
    )
}

export default ChangeConfigSorts_drawer