
import { useState, useEffect } from "react";
import Markdown from 'react-markdown';

export default function Index (props) {
    const {
        id,
        page,
        title,
        section,
        stringSpaceToDash,
    } = props;
    const [markdownContent, setMarkdownContent] = useState()
    useEffect(()=>{
        fetch("site-contents/"+page+"/"+title+"/"+stringSpaceToDash(section.title.toLowerCase())+"-text.md").then(res=>res.text()).then(content=>setMarkdownContent(content))
    },[page, title, section, stringSpaceToDash])
    return (
    <div
        id={id}
        className='col-xl-6 col-md-12 text-white d-flex py-2'
    >
        <div
            className="p-4 rounded rounded-5 drop-shadow bg-light-matte"
        >
            <Markdown children={markdownContent}/>
        </div>
    </div>
    )
}