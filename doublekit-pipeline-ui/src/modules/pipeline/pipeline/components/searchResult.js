import React ,{useEffect} from 'react'
import './pipelineHeader'
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import './searchResult.scss'

const SearchResult = props => {

    const {PipelineStore,match}=props
    const {searchPipelineList,selectName}=PipelineStore

    useEffect(()=>{
        selectName(match.params.searchresult)
    },[])

    const  goPipelineTask= text =>{
        localStorage.setItem('pipelineName',text.pipelineName)
        localStorage.setItem('pipelineId',text.pipelineId)
        props.history.push('/home/task/work')
    }

    return(
        <div className='search'>
           <div>
               <h1 >查找的流水线</h1>
               <ul >
                   {
                       searchPipelineList  && searchPipelineList.map((item,index)=>{
                           return(
                               <li key={item.pipelineId} >
                                   <span> {index+1}、</span>
                                   <span className={'search-link'} onClick={()=> goPipelineTask(item)}>{item.pipelineName}</span>
                               </li>
                           )
                       })
                   }
               </ul>
           </div>
        </div>
    )
}

export default withRouter(inject('PipelineStore')(observer(SearchResult)))
