import React from "react";
import CodeGitOrGitlab from "./codeGitOrGitlab";
import CodeGiteeOrGithub from "./codeGiteeOrGithub";
import CodeSvn from "./codeSvn";
import TestUnit from "./testUnit";
import BuildMavenOrNode from "./buildMavenOrNode";
import Deploy from "./deploy";
import ScanSonarQuebe from "./scanSonarQuebe";
import GoodsNexus from "./goodsNexus";
import GoodsSsh from "./goodsSsh";
import MesNotify from "./mesNotify";

const Forms = props =>{

    const {type} = props


    return (
        <>
            {
                (()=>{
                    switch (type){
                        case 1:
                        case 4:
                            return <CodeGitOrGitlab/>
                        case 2:
                        case 3:
                            return <CodeGiteeOrGithub/>
                        case 5:
                            return <CodeSvn/>
                        case 11:
                            return <TestUnit/>
                        case 21:
                        case 22:
                            return <BuildMavenOrNode/>
                        case 31:
                        case 32:
                            return <Deploy/>
                        case 41:
                            return <ScanSonarQuebe/>
                        case 51:
                            return <GoodsNexus/>
                        case 52:
                            return <GoodsSsh/>
                        case 61:
                            return <MesNotify/>
                    }
                })()
            }
        </>
    )
}

export default Forms