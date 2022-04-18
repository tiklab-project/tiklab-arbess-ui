import React ,{useEffect} from 'react'
import './pipelineSearch'
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import './searchResult.scss'

const SearchResult = props => {

    const {PipelineStore,match}=props
    const {searchPipelineList,findOneName}=PipelineStore

    useEffect(()=>{
        findOneName(match.params.searchresult)
    },[])

    const  goPipelineTask= record =>{
        localStorage.setItem('pipelineName',record.pipelineName)
        localStorage.setItem('pipelineId',record.pipelineId)
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