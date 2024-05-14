import { Image } from "react-bootstrap";
import Markdown from 'react-markdown';
import ButtonPair from "./buttonPair";
import { useEffect, useState } from "react";

export default function Index (props) {
    const {
        featurePage,
        stringSpaceToDash,
        featureMarkdown,
        projects,
    } = props;
    const [markdownContent, setMarkdownContent] = useState()
    useEffect(()=>{
        fetch("site-contents/"+stringSpaceToDash(featurePage.toLowerCase())+"/feature.md")
        .then(res=>res.text())
        .then(content=>setMarkdownContent(content))
        .catch(err=>console.log(err))

    },[featurePage, stringSpaceToDash, featureMarkdown])
    return (
        <div className='col-xl col-sm-12 my-xl-0 my-3 d-flex flex-column p-0 mx-xl-2 mx-sm-0 drop-shadow rounded rounded-4 overflow-hidden bg-light-matte'>
            <Image src={"/assets/"+stringSpaceToDash(featurePage.toLowerCase())+"/feature.jpg"} className='w-100'/>
            <div className='px-3 flex-fill py-3 secondary-font text-white'>
                <Markdown children={markdownContent}/>
            </div>
            <div className="row justify-content-end m-0 p-2">
            <ButtonPair
                localUrl={"/"+stringSpaceToDash(featurePage.toLowerCase())}
                demoUrl={projects.filter(project=>
                    stringSpaceToDash(project.page.toLowerCase())===stringSpaceToDash(featurePage.toLowerCase()))[0].demoUrl}
            />
            </div>
        </div>
    )
}