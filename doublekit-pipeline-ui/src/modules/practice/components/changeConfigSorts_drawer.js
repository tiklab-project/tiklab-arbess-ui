import React ,{useState,useEffect} from "react";
import {Button, Drawer,Tree} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const ChangeConfigSorts_drawer = props =>{

    const {changeSortVisible,setChangeSortVisible,data,setData} = props

    const [gData,setGData] = useState([])

    let nameArray = []
    useEffect(()=>{
        data && data.map((item,index)=>{
            nameArray.push({
                key:index,
                title:item.step + '--' + item.desc,
                step:item.step,
                desc:item.desc
            })
         })
        setGData(nameArray)
    },[data])

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
            cData.push({
                step:item.step,
                desc:item.desc
            })
        })
        setData(cData)

    }

    return (
        <Drawer
            placement="right"
            style={{marginTop:51}}
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