import React from "react";
import {Breadcrumb} from "antd";

// 节点
const WorkSpaceNod = props =>{

    const {fileList,setFileList,setFresh,fresh,catalogue,setCatalogue,readFile,setDetailsDrawer,setDrawerContent
    } = props
    const pipelineName = localStorage.getItem('pipelineName')

    const renderType = treeType => {
        switch (treeType){
            case 1:
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-wenben" />
                        </svg>
            case 2:
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-wenjian" />
                        </svg>
        }
    }

    // 改变目录
    const level = []
    const changeCatalogue = group => {
        setFileList(group.fileTree)
        catalogue && catalogue.map((item,index)=>{
            if(group.treeName === item.treeName){
                catalogue.splice(index+1,catalogue.length-index-1)
            }
        })
        setCatalogue([...catalogue])
    }

    // 文件节点和目录
    const goDetails = group => {
        setFileList(group.fileTree)
        level.push(group)
        setCatalogue([...catalogue,...level])
    }

    // 节点文件下文本详情
    const textDetails = group => {
        readFile(group.treePath).then(res=>{
            setDrawerContent({title:group.treeName,commitFile:res.data})
            setDetailsDrawer(true)
        })
    }

    const setBreadcrumb = () =>{
        setCatalogue([])
        setFresh(!fresh)
    }

    // 渲染目录
    const renderCatalogue = catalogue => {
        return catalogue && catalogue.map((group,index)=>{
            return   <Breadcrumb.Item
                            key={index}
                            className = 'catalogue_item_breadcrumb'
                            onClick={()=>changeCatalogue(group)}
                     >
                        {group.treeName}
                     </Breadcrumb.Item>
        })
    }

    // 递归
    const renderFileList = fileList => {
        return fileList && fileList.map((group,index)=>{
            if(group.treeType === 1 ){
                return  <div className='nod_item_tree' key={index}>
                            <span> {renderType(group.treeType)} </span>
                            <span className='nod_item_tree_name'
                                  onClick={()=>textDetails(group)}
                            >
                                {group.treeName}
                            </span>
                        </div>
            }else {
                return   <div className='nod_item_tree' key={index}>
                            <span>{renderType(group.treeType)}</span>
                            <span className='nod_item_tree_name'
                                  onClick={()=>{goDetails(group)}}
                            >
                                {group.treeName}
                            </span>
                            {renderFileList(fileList.fileTree)}
                        </div>
            }
        })
    }

    return(
        <div className='workSpace-top'>
            <h1>节点master上的工作空间</h1>
            <div className='workSpace-top-catalogue'>
                <Breadcrumb>
                    <Breadcrumb.Item
                        className = 'catalogue_item_breadcrumb'
                        onClick={()=>setBreadcrumb()}
                    >
                        <span> {renderType(2)}{pipelineName} </span>
                    </Breadcrumb.Item>
                    {renderCatalogue(catalogue)}
                </Breadcrumb>
            </div>
            <div className='workSpace-top-nod'>
                {renderFileList(fileList)}
            </div>
        </div>
    )
}

export default WorkSpaceNod