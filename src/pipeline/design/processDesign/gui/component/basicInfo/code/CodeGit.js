/**
 * @Description: Git
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React from "react";
import FormsInput from "../FormsInput";
import FormsTool from "../FormsTool";
import {toolGit} from "../../../../../../../common/utils/Constant";
import {observer} from "mobx-react";
import FormsSelect from "../FormsSelect";
import {Select} from "antd";

const CodeGit = props =>{

    const {taskStore} = props

    const {dataItem,updateTask} = taskStore;

    /**
     * 认证类型
     */
    const changAuthType = (value,type) => {
        updateTask({[type]:value})
    }

    return(
        <>
            <FormsTool
                scmType={toolGit}
            />
            <FormsInput
                placeholder={"Git仓库地址"}
                label={"Git仓库地址"}
                name={"codeName"}
                isRequire={true}
            />
            <FormsInput
                placeholder={"分支，默认为master"}
                label={"分支"}
                name={"codeBranch"}
            />
            <FormsSelect
                label={'认证'}
                name={'authType'}
                rules={[
                    {required:true,message:'认证类型不能为空'}
                ]}
                onChange={value=>changAuthType(value,'authType')}
            >
                <Select.Option value={'none'}>无</Select.Option>
                <Select.Option value={'userPass'}>密码</Select.Option>
                <Select.Option value={'prikey'}>密钥</Select.Option>
            </FormsSelect>
            {
                dataItem.task?.authType === 'userPass' && (
                    <>
                        <FormsInput
                            label={"用户名"}
                            placeholder={"用户名"}
                            name={'username'}
                            isRequire={true}
                        />
                        <FormsInput
                            label={"密码"}
                            placeholder={"密码"}
                            name={'password'}
                            isRequire={true}
                            InputType={'Password'}
                        />
                    </>
                )
            }
            {
                dataItem.task?.authType === 'prikey' && (
                    <FormsInput
                        label={"密钥"}
                        placeholder={"密钥"}
                        name={'priKey'}
                        isRequire={true}
                        InputType={'TextArea'}
                    />
                )
            }
        </>
    )
}

export default observer(CodeGit)
