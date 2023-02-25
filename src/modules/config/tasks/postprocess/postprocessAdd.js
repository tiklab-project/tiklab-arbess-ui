import React,{useState} from "react";
import {Dropdown} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../common/btn/btn";
import PostprocessUserAdd from "../../postprocess/components/postprocessUserAdd";

const PostprocessAdd = props => {

    const {item,allUserList,yUserList,setYUserList,postprocessData,setPostprocessData} = props

    const [userAddVisible,setUserAddVisible] = useState(false)

    return (
        <Dropdown
            overlay={ <PostprocessUserAdd
                userAddVisible={userAddVisible}
                setUserAddVisible={setUserAddVisible}
                allUserList={allUserList}
                yUserList={yUserList}
                postprocessData={postprocessData}
                setPostprocessData={setPostprocessData}
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

export default PostprocessAdd
