import React,{useEffect,useState} from "react";
import "./dynamicDetails.scss";
import zhCN from "antd/es/locale/zh_CN";
import {getUser} from "tiklab-core-ui";
import {ConfigProvider,Pagination} from "antd";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import DynamicList from "./dynamicList";

const DynamicDetails = props =>{

    const {homePageStore} = props
    const {findUserAction,dynamicList,page} = homePageStore
    const [pageNumber,setPageNumber] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:15,
        }
        findUserAction(params)
    },[])

    const onChangePage = page =>{
        const params = {
            userId:userId,
            page:page,
            pageSize:15,
        }
        setPageNumber(page)
        findUserAction(params)
    }

    return(
        <div className="dynamic-details">
            <DynamicList
                {...props}
                pageNumber={pageNumber}
                dynamicList={dynamicList}
                dynamicTitle={"全部动态"}
                dynamicClickText={"返回"}
            />
            <div className="dynamic-pagination">
                <ConfigProvider locale={zhCN}>
                    <Pagination
                        {...page}
                        hideOnSinglePage={true}
                        showQuickJumper={true}
                        showSizeChanger={false}
                        onChange={onChangePage}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(DynamicDetails)))