import React,{useEffect,useState} from "react";
import {message, Progress, Space, Table,Row,Col} from 'antd';
import {getUser,parseUserSearchParams} from "thoughtware-core-ui";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import Btn from "../../../common/component/btn/Btn";
import {SpinLoading} from "../../../common/component/loading/Loading";
import ListEmpty from "../../../common/component/list/ListEmpty";
import ListIcon from "../../../common/component/list/ListIcon";
import resourceStore from "../store/ResourceStore";
import "./Resources.scss";

/**
 * 资源监控，可用容量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Resources = props => {

    const {findResourcesList,findDiskList,cleanDisk} = resourceStore

    // 加载状态
    const [isLoading,setIsLoading] = useState(true)

    // 资源占用列表
    const [diskList,setDiskList] = useState([])

    // 资源占用概况
    const [resourceList,setResourceList] = useState({})

    // 选择清理缓存的keys
    const [selectedRowKeys,setSelectedRowKeys] = useState([]);

    useEffect(()=>{
        // 获取占用内存
        findResources()
        // 获取流水线缓存
        findDisk()
    },[])

    /**
     * 获取占用内存
     */
    const findResources = () => {
        // 获取占用内存
        findResourcesList().then(r=>{
            if(r.code===0){
                setResourceList(r.data)
            }
            setIsLoading(false)
        })
    }

    /**
     * 获取流水线缓存
     */
    const findDisk = () => {
        findDiskList().then(r=>{
            if(r.code===0){
                setDiskList(r.data)
            }
        })
    }

    /**
     * 清理缓存
     */
    const clean = () =>{
        if(selectedRowKeys.length < 1){
            return message.info("请选择需要清除缓存的流水线")
        }
        cleanDisk({
            fileList: selectedRowKeys
        }).then(r=>{
            if(r.code===0){
                findDisk()
                if(version==='cloud'){findResources()}
            }
        })
    }

    const columns = [
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width:"50%",
            ellipsis:true,
            render:(text,record)=>{
                return (
                    <div className="info-disk-item">
                        <Space>
                            <ListIcon text={record.name}/>
                            <div>
                                <div className="info-disk-item-name">{record.name}</div>
                                <div className="info-disk-item-size">{record.userSize}</div>
                            </div>
                        </Space>
                    </div>
                )
            }
        },
        {
            title: "路径",
            dataIndex: "filePath",
            key: "filePath",
            width:"50%",
            ellipsis:true,
        }
    ]

    /**
     * 手动选择/取消选择所有行的回调
     */
    const onSelectAll = (selected,selectedRows,changeRows) => {
        const newArr = changeRows.map(item=>item && item.path).filter(Boolean)
        if(selected){
            const uniq = Array.from(new Set([...newArr,...selectedRowKeys]))
            setSelectedRowKeys(uniq)
        }
        else {
            const uniq = selectedRowKeys.filter(item=>!newArr.includes(item))
            setSelectedRowKeys(uniq)
        }
    }

    /**
     * 点击表格行勾选
     * @param record
     */
    const onSelectRow = record => {
        if (selectedRowKeys.indexOf(record.path) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.path), 1)
        }
        // 如果没有选中 -- 选中
        else {
            selectedRowKeys.push(record.path)
        }
        setSelectedRowKeys([...selectedRowKeys])
    }

    const rowSelection = {
        selectedRowKeys,
        onSelectAll:onSelectAll,
        onSelect: onSelectRow,
    }


    if(isLoading) return <SpinLoading size="large"/>

    // 并发数百分比
    const ccyPercent = (resourceList?.useCcyNumber/resourceList?.ccyNumber) * 100

    // 构建时长百分比
    const scePercent = (resourceList?.useSceNumber/resourceList?.sceNumber) * 100

    // 缓存大小百分比
    const cachePercent = (resourceList?.useCacheNumber/resourceList?.cacheNumber) * 100

    const limitation = (number,unit) =>{
        if(number < 0) return "不限"
        return number + unit
    }

    const upGradation = () => {
        if(version==='ce'){
            window.open("http://thoughtware.net/download/product/productDetail?code=matflow&type=ee")
            return
        }
        const authServiceUrl = JSON.parse(localStorage.getItem("authConfig"))?.authServiceUrl
        if(authServiceUrl){
            const user = getUser();
            window.open(`${authServiceUrl}/#/enterprise/application?${parseUserSearchParams({
                ticket:user.ticket,
                tenant:user.tenant,
                userId:user.userId
            })}`)
        }
    }

    return (
        <Row className='resources mf-home-limited mf'>
            <Col
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <BreadCrumb firstItem={"资源监控"}>
                    {
                        resourceList?.version===1 &&
                        <Btn
                            type={"primary"}
                            title={"升级企业版"}
                            onClick={upGradation}
                        />
                    }
                </BreadCrumb>
                <div className="resources-content">
                    <div className='resources-info-version'>当前版本：{resourceList?.version===1?'免费版':'付费版'}</div>
                    <div>
                        <div className='resources-info-item'>
                            <div className='resources-item-title'>并发数</div>
                            <div className='resources-item-total'>{limitation(resourceList?.ccyNumber,'')}</div>
                            <div className='resources-item-progress'>
                                <Progress percent={ccyPercent > 1 ? ccyPercent : 1} showInfo={false}/>
                            </div>
                            <div className='resources-item-title'>剩余并发数</div>
                            <div className='resources-item-residue'>{limitation(resourceList?.residueCcyNumber,'')} </div>
                        </div>
                        <div className='resources-info-item'>
                            <div className='resources-item-title'>构建时长</div>
                            <div className='resources-item-total'>{limitation(resourceList?.sceNumber,'分钟/月')}</div>
                            <div className='resources-item-progress'>
                                <Progress percent={scePercent > 1 ? scePercent : 1} showInfo={false}/>
                            </div>
                            <div className='resources-item-title'>剩余时长</div>
                            <div className='resources-item-residue'>{limitation(resourceList?.residueSceNumber,'分钟')}</div>
                        </div>
                        <div className='resources-info-item'>
                            <div className='resources-item-title'>磁盘空间</div>
                            <div className='resources-item-total'>{limitation(resourceList?.cacheNumber,'G')}</div>
                            <div className='resources-item-progress'>
                                <Progress percent={cachePercent > 1 ? cachePercent : 1}  showInfo={false}/>
                            </div>
                            <div className='resources-item-title'>剩余空间</div>
                            <div className='resources-item-residue'>{limitation(resourceList?.residueCacheNumber,'G')}</div>
                        </div>
                    </div>
                    <div className='resources-info-version'> 流水线缓存</div>
                    <div className='resources-info-disk'>
                        <Table
                            pagination={false}
                            rowSelection={rowSelection}
                            onRow={record => ({
                                onClick: () => onSelectRow(record)
                            })}
                            columns={columns}
                            dataSource={diskList}
                            rowKey={r=>r.path}
                            locale={{emptyText: <ListEmpty title={"暂无缓存信息"}/>}}
                        />
                    </div>
                    {
                        diskList?.length > 0 &&
                        <Btn title={"清理缓存"} onClick={clean}/>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default Resources
