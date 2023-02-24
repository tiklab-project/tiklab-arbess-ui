import React,{useState} from "react";
import {Dropdown} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import PostposeUserAdd from "../../postpose/components/postposeUserAdd";

const PostposeAdd = props => {

    const {item,allUserList,yUserList,setYUserList,postposeData,setPostposeData} = props

    const [userAddVisible,setUserAddVisible] = useState(false)

    return (
        <Dropdown
            overlay={ <PostposeUserAdd
                userAddVisible={userAddVisible}
                setUserAddVisible={setUserAddVisible}
                allUserList={allUserList}
                yUserList={yUserList}
                postposeData={postposeData}
                setPostposeData={setPostposeData}
                type={'task'}
            />}
            placement={"bottomRight"}
            visible={userAddVisible}
            trigger={['click']}
            onVisibleChange={visible => setUserAddVisible(visible)}
        >
            <Btn
                type={"link-nopadding"}
                icon={<PlusOutlined/>}
                onClick={()=>setYUserList(item)}
                title={"添加成员"}
            />
        </Dropdown>
    )
}

export default PostposeAdd
