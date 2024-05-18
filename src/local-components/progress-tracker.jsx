
import { useState, useEffect, useRef } from "react";
import Markdown from 'react-markdown';

export default function Index (props) {
    const {
        id,
        index,
        page,
        total,
        section,
        stringSpaceToDash,
    } = props;
    const [markdownContent, setMarkdownContent] = useState()
    const milestoneRef = useRef()
    const contentRef = useRef()

    useEffect(()=>{
        fetch("site-contents/"+page+"/"+stringSpaceToDash(section.title.toLowerCase())+"-progress.md").then(res=>res.text()).then(content=>
        {setMarkdownContent(content)})
    },[page, section, stringSpaceToDash, milestoneRef, contentRef])
    return (
    <div
        id={id}
        className='text-white align-items-center py-2 row m-0 position-relative col-10 mx-auto'
    >
        {(index!==0)&&<div 
            className="position-absolute bg-light p-0 m-0 rounded rounded-5"
            
            style={{
                width: "4px",
                height: '25%',
                top: -2,
                left: milestoneRef.current&&milestoneRef.current.offsetWidth-5
            }}    
        ></div>}
        <div 
            className=" rounded rounded-5 drop-shadow border border-4 m-2"
            style={{width:section.fixedWidth??"auto"}}
            ref={milestoneRef}
        >
            <p className="m-0 py-1 text-center prime-font">{section.milestone}</p>
        </div>
        {(index!==total-1)&&<div 
            className="position-absolute bg-light p-0 m-0 rounded rounded-5"
            
            style={{
                width: "4px",
                bottom: -2,
                height: '25%',
                left: milestoneRef.current&&milestoneRef.current.offsetWidth-5
            }}    
        ></div>}
        <div
            className="col p-4 rounded rounded-5 drop-shadow bg-light-matte"
        >
            <Markdown children={markdownContent}/>
        </div>
    </div>
    )
}