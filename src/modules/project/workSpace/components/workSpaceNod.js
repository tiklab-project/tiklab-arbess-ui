import React,{Fragment} from "react";

// 节点
const WorkSpaceNod = props =>{

    const {fileList,setFileList,setFresh,fresh,catalogue,setCatalogue,readFile,setDetailsDrawer,setDrawerContent,matFlowName} = props

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

    // 节点文件和目录
    const goDetails = group => {
        setFileList(group.fileTree)
        level.push(group)
        setCatalogue([...catalogue,...level])
    }

    // 节点文本详情
    const textDetails = group => {
        readFile(group.treePath).then(res=>{
            if(res.code===0){
                setDrawerContent({title:group.treeName,commitFile:res.data})
            }
            setDetailsDrawer(true)
        })
    }

    // 重新渲染节点
    const setBreadcrumb = () =>{
        setCatalogue([])
        setFresh(!fresh)
    }

    // 渲染目录
    const renderCatalogue = catalogue => {
        return catalogue && catalogue.map((group,index)=>{
            return  <Fragment key={index}>
                        <span> > </span>
                        <span className="catalogue_item_breadcrumb"
                              onClick={()=>changeCatalogue(group)}
                        >
                            {group.treeName}
                        </span>
                    </Fragment>
        })
    }

    // 渲染文件
    const renderFileList = fileList => {
        return fileList && fileList.map((group,index)=>{
            return  <div className="file_item_tree" key={index}>
                        <span>{renderType(group.treeType)} </span>
                        <span className="file_item_tree_name"
                              onClick={()=>group.treeType===1 ? textDetails(group) :goDetails(group)}
                        >
                            {group.treeName}
                        </span>
                    </div>
        })
    }

    return(
        <div className="workSpace-content-nod">
            <h1>节点master上的工作空间</h1>
            <div className="workSpace-content-nod-catalogue">
                <span className = "catalogue_item_breadcrumb"
                      onClick={()=>setBreadcrumb()}
                >
                        <span>{renderType(2)}{matFlowName}</span>
                    </span>
                {renderCatalogue(catalogue)}
            </div>
            <div className="workSpace-content-nod-file">
                {renderFileList(fileList)}
            </div>
        </div>
    )
}

export default WorkSpaceNod