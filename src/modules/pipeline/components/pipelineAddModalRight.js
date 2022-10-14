import React from "react";
import "./pipelineAddModalRight.scss";
import {Row,Col,Form,Input} from "antd";
import {NodeIndexOutlined} from "@ant-design/icons";

const PipelineAddModalRight = props =>{

    const {templateType,setTemplateType,pipelineList,inputRef,form,onScroll,lis} = props

    const renderLis = lis =>{
        return lis.map(item=>{
            return(
                <div key={item.id}
                     id={item.type}
                     className={`pipelineAddModalRight-li pipelineAddModalRight-same ${templateType==item.id?"pipelineAddModalRight-selected":""}`}
                     onClick={()=>setTemplateType(item.id)}
                >
                    <div className="pipelineAddModalRight-li-header">
                        <div className="li-header-title">
                            <NodeIndexOutlined />
                            <span className="li-header-name">{item.title}-</span>
                        </div>
                        <div className="li-header-desc">
                            部署到
                                <span className="li-header-title">
                                    {item.desc}
                                </span>
                            环境
                        </div>
                    </div>
                    <div className="pipelineAddModalRight-li-content">
                        {
                            item.zreo ?
                                <div className="li-step">
                                    <span className="li-step-name li-after">
                                        {item.zreo}
                                    </span>
                                </div>
                                :
                                null
                        }
                        <div className="li-step">
                            <span className="li-step-name li-after">
                                {item.first}
                            </span>
                        </div>
                        <div className="li-step">
                            <span className="li-step-name">
                                {item.second}
                            </span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
       <>
           <Form
               id="form"
               name="basic"
               autoComplete="off"
               form={form}
               initialValues={{pipelineType:1}}
               // labelCol={{ span: 3 }}
               // wrapperCol={{ span: 20 }}
               layout={"vertical"}
           >
               <Form.Item
                   label="流水线名称"
                   name="pipelineName"
                   rules={[
                       {required:true,message:""},
                       {
                           pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                           message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                       },
                       ({ getFieldValue }) => ({
                           validator(rule, value) {
                               if (!value) {
                                   return Promise.reject("请输入名称")
                               }
                               let nameArray = []
                               if(pipelineList){
                                   nameArray = pipelineList && pipelineList.map(item=>item.pipelineName);
                               }
                               if (nameArray.includes(value)) {
                                   return Promise.reject("名称已经存在");
                               }
                               return Promise.resolve()
                           },
                       }),
                   ]}
               >
                   <Input ref={inputRef}/>
               </Form.Item>
               {/*<Form.Item name="pipelineType" label="流水线类型">*/}
               {/*    <Select>*/}
               {/*        <Option value={1}>流水线</Option>*/}
               {/*    </Select>*/}
               {/*</Form.Item>*/}
           </Form>
           <Row className="pipelineAddModalRight">
               {/*<Col span={3} className="pipelineAddModalRight-title">流水线类型：</Col>*/}
               <Col span={24} className="pipelineAddModalRight-ul"  id="pipelineAddModalRight" onScroll={onScroll}>
                   <div style={{height:40}}>自定义模板</div>
                   <div
                       id={"1"}
                       className={`pipelineAddModalRight-self pipelineAddModalRight-same ${templateType==1?"pipelineAddModalRight-selected":""}`}
                       onClick={()=>setTemplateType(1)}
                   >
                       <div className="li-self">自定义配置</div>
                   </div>
                   <div style={{height:50,lineHeight:"50px"}}>推荐模板</div>
                   {renderLis(lis)}
               </Col>
           </Row>
       </>
    )
}

export default PipelineAddModalRight