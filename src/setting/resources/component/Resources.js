import React,{useEffect,useState} from "react";
import {message, Progress, Space, Table} from 'antd';
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import Btn from "../../../common/component/btn/Btn";
import {SpinLoading} from "../../../common/component/loading/Loading";
import EmptyText from "../../../common/component/emptyText/EmptyText";
import ListIcon from "../../../common/component/list/ListIcon";
import resourceStore from "../store/ResourceStore";
import "./Resources.scss";

/**
 * 资源占用，可用容量
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Resources = props => {

    const {findResourcesList,findDiskList,cleanDisk} = resourceStore

    const [isLoading,setIsLoading] = useState(true)

    const [diskList,setDiskList] = useState([])

    const [resourceList,setResourceList] = useState({})

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
            pipelineList: selectedRowKeys
        }).then(r=>{
            if(r.code===0){
                findDisk()
                if(version==='cloud'){findResources()}
            }
        })
    }

    const columns = [
        {
            title: "全选",
            dataIndex: "name",
            key: "name",
            width:"100%",
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
        }
    ]

    /**
     * 手动选择/取消选择所有行的回调
     */
    const onSelectAll = (selected,selectedRows,changeRows) => {
        const newArr = changeRows.map(item=>item && item.pipelineId).filter(Boolean)
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
        if (selectedRowKeys.indexOf(record.pipelineId) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.pipelineId), 1)
        }
        // 如果没有选中 -- 选中
        else {
            selectedRowKeys.push(record.pipelineId)
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

    return (
        <div className='resources mf-home-limited mf'>
            <Breadcrumb firstItem={"资源占用"}>
                <Btn
                    type={"primary"}
                    title={"升级企业版"}
                />
            </Breadcrumb>
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
                        dataSource={diskList?.diskList}
                        rowKey={record=>record.pipelineId}
                        locale={{emptyText: <EmptyText title={"暂无缓存信息"}/>}}
                    />
                </div>
                {
                    diskList?.diskList && diskList?.diskList.length > 0 &&
                    <Btn title={"清理缓存"} onClick={clean}/>
                }
            </div>
        </div>
    )
}

export default Resources
