
import { Image } from 'react-bootstrap';
import Markdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';


export default function Index (props) {

    const {
        section,
        page,
        stringSpaceToDash
    } = props
    const [markdownContent, setMarkdownContent] = useState()
    useEffect(()=>{
        fetch("site-contents/"+page+"/"+stringSpaceToDash(section.title.toLowerCase())+".md").then(res=>res.text()).then(content=>setMarkdownContent(content))
    },[page, section, stringSpaceToDash])
    return (
    <div className='my-3'>
        <div className={'row mx-auto bg-light-matte overflow-hidden rounded-3 drop-shadow '
            + (isMobile?"h-auto":"h-100")
        }>
            <div className={{
                    'right':!isMobile&&'order-2'
                }[section.direction] +
                " col-xl-5 col-md-12 h-100 p-0 overflow-hidden d-flex justify-content-center align-items-center position-relative "
                }>
                <Image 
                    className={(!isMobile&&"position-absolute")+" w-100"}
                    src={'./assets/'+page+'/'+stringSpaceToDash(section.title.toLowerCase())+"-description.jpg"}    
                />
            </div>
            <div 
                className='col-xl col-md-12 p-4 text-light w-100'>
                <div className='bg-dark-matte h-100 p-4 drop-shadow rounded-3'>
                    <h3 className='text-secondary'>{section.title}</h3>
                    <Markdown children={markdownContent}/>
                </div>
            </div>
        </div>
    </div>
    )
}