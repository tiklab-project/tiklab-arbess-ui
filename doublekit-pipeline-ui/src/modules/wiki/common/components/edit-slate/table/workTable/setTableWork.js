/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-28 13:51:51
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 08:59:50
 */
import {createRow} from "./withTablesWork";

const setWorkData = (value,findWorkItem) => {
    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        },
        {
            title: '负责人',
            dataIndex: ['assigner', 'name'],
            key: 'assigner',
        },
        {
            title: '状态',
            dataIndex: ['workStatus', 'name'],
            key: 'workStatus',
        },
        {
            title: '类型',
            dataIndex: ['workType', 'name'],
            key: 'workStatus',
        }
    ];
    const neweditor = (value)=>{
        const newValue = [...value]
        return value.map((item,index)=> {
            if(item.type === "table-work" && item.childrenType === "table-row") {
                let rowData;
                findWorkItem(item.id).then((data)=> {
                    const rowNodes = createRow(data,columns)
                    value[index] = rowNodes
                })
                
            }
            if(item.children && item.children.length >0){
                neweditor(item.children)
            }else {
                return value
            }
            return value
        })
    }
    const data = neweditor(value);
    return data;
}
export default setWorkData;