import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip} from "antd";
import {applyJump} from "tiklab-core-ui"
import {DeleteOutlined} from "@ant-design/icons";
import testOnStore from "../design/processDesign/processDesign/store/TestOnStore";
import Breadcrumb from "../../common/component/breadcrumb/Breadcrumb";
import EmptyText from "../../common/component/emptyText/EmptyText";
import {SpinLoading} from "../../common/component/loading/Loading";
import Page from "../../common/component/page/Page";
import {deleteSuccessReturnCurrenPage} from "../../common/utils/Client";
import "./Test.scss";

/**
 * 测试页面(teston)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Test = props => {

    const {pipelineStore} = props

    const {pipeline} = pipelineStore
    const {findAllRelevance,testList,deleteRelevance} = testOnStore

    const [pageParam] = useState({
        pageSize:10,
        currentPage: 1,
    })

    // 测试页数
    const [testPage,setTestPage] = useState({
        totalPage:1,
        totalRecord:1
    })

    // 请求数据
    const [param,setParam] = useState({
        pageParam
    })

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 列表toolTip状态
    const [open,setOpen] = useState(null)

    useEffect(()=>{
        // 获取测试列表
        findAllRelevance({
            pipelineId:pipeline.id,
            ...param
        }).then(r=>{
            setTestPage({
                totalPage: r.data?.totalPage || 1,
                totalRecord: r.data?.totalRecord || 1,
            })
            setIsLoading(false)
        })
    },[param])

    /**
     * 查看测试详情
     * @param item
     */
    const goTestDetail = item => {
        if(item.status===2) return
        const url = item.url+"/#/repository/report/"+item.testonId
        return applyJump(url)
    }

    /**
     * 列表提示状态
     * @param item
     */
    const onOpenChange = item => {
        if(item.status===2){
            if(open) return setOpen(null)
            return setOpen(item.relevanceId)
        }
    }

    /**
     * 鼠标悬浮事件
     * @param item
     */
    const itemMouseOver = item => {
        if(item.status===2) return setOpen(item.relevanceId)
    }

    /**
     * 删除按钮鼠标事件
     * @param e
     */
    const delMouse = e => {
        e.stopPropagation()
        setOpen(null)
    }

    /**
     * 删除测试
     * @param e
     * @param item
     */
    const del = (e,item) => {
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteRelevance(item.relevanceId).then(res=>{
            if(res.code===0){
                const current = deleteSuccessReturnCurrenPage(testPage.totalRecord,10,param.pageParam.currentPage)
                changPage(current)
            }
        })
    }

    /**
     * 换页
     * @param page
     */
    const changPage = page => {
        setParam({
            pageParam:{
                pageSize:10,
                currentPage: page
            }
        })
    }

    if(isLoading){
        return  <div className='test'>
                    <SpinLoading size="large" title="加载中……"/>
                </div>
    }

    return (
        <div className='test'>
            <div className="test-content mf">
                <Breadcrumb firstItem={"测试"}/>
                <div className='test-table'>
                    {
                        testList && testList.length > 0 ?
                        testList.map(item=> {
                            const {object} = item
                            return (
                                <Tooltip
                                    key={item.relevanceId}
                                    title={item.status===2 && "该测试记录详情已被删除"}
                                    visible={open===item.relevanceId}
                                    onOpenChange={()=>{onOpenChange(item)}}
                                >
                                    <div
                                        className='test-table-item'
                                        style={{backgroundColor:item.status===2?"#f0f0f0":"#ffffff"}}
                                        onClick={()=>goTestDetail(item)}
                                        onMouseOver={()=>itemMouseOver(item)}
                                        onMouseLeave={()=>setOpen(null)}
                                    >
                                        <div className='test-item-name'>{object?.testPlanName || '--'}</div>
                                        <div className='test-item-total'>
                                            <div>用例数</div>
                                            <div>{object?.total || '--'}</div>
                                        </div>
                                        <div className='test-item-passNum'>
                                            <div>成功数</div>
                                            <div>{object?.passNum || '--'}</div>
                                        </div>
                                        <div className='test-item-failNum'>
                                            <div>失败数</div>
                                            <div>{object?.failNum || '--'}</div>
                                        </div>
                                        <div className='test-item-passRate'>
                                            <div>成功率</div>
                                            <div>{object?.passRate || '--'}</div>
                                        </div>
                                        <div className='test-item-time'>
                                            <div>时间</div>
                                            <div>{item?.time || '--'}</div>
                                        </div>
                                        <div className='test-item-action'>
                                            <span
                                                onClick={e=>del(e,item)}
                                                onMouseOver={e=>delMouse(e)}
                                                onMouseLeave={e=>delMouse(e)}
                                            >
                                                <Tooltip title={'删除'}>
                                                    <DeleteOutlined/>
                                                </Tooltip>
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>
                            )
                        })
                        :
                        <EmptyText title={'暂无测试记录'}/>
                    }

                    <Page
                        currentPage={param.pageParam.currentPage}
                        changPage={changPage} 
                        page={testPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default inject("pipelineStore")(observer(Test))
