import { useState } from "react";
import { Image } from "react-bootstrap";
import ButtonPair from "./buttonPair";
import SvgFeatureImg from "./svgOverride";
import { isMobile } from "react-device-detect";

export default function Index (props) {
    const {
        section,
        toTitleCase,
        projects,
        radioValue,
        stringSpaceToDash,
    } = props;
    const [scale, setScale] = useState(false)
    return (
        (radioValue==='all'||!(projects.filter(project=>
            project.category===radioValue).map(project=>
                project.page).map(page=>stringSpaceToDash(page.toLowerCase()))
            .indexOf(stringSpaceToDash(section['feature-page'].toLowerCase()))>=0||
            projects.filter(project=>
                project.category===radioValue).map(project=>
                    project.page).map(page=>stringSpaceToDash(page.toLowerCase())).length===0))&&
        <div 
            className={"col-xl-4 col-sm-12 m-0 p-0 p-2 " +(!isMobile&&"h-50")}
        >    
            <div 
                className="h-100 transition-ease position-relative overflow-hidden rounded-4 drop-shadow"
                style={{transform: scale&&"scale(1.05)"}}
                onMouseEnter={()=>setScale(true)}
                onMouseLeave={()=>setScale(false)}
                >
                <div 
                    className="h-100 d-flex p-3 position-absolute w-100"
                    style={{zIndex: 1}}
                >
                    <p
                        className={"text-light m-0 p-2 rounded-3 position-absolute transition-ease "+(scale?"bg-dark-matte ":"bg-dark drop-shadow")}
                    >{toTitleCase(section['feature-page'])}</p>
                    <div 
                        className="w-100 h-100 d-flex justify-content-end align-items-end transition-ease"
                        style={{opacity:scale||isMobile?1:0}}
                    >
                    <ButtonPair
                        localUrl={"/"+stringSpaceToDash(section['feature-page'].toLowerCase())}
                        demoUrl={projects.filter(project=>project.page===section['feature-page'])[0].demoUrl}
                    />
                    </div>
                </div>
                <div
                    className="w-100 h-100 transition-ease"
                    style={{opacity:scale?1:0.7}}
                >
                    {projects.filter(project=>project.page===section['feature-page'])[0].imgExt==='svg'?
                    <div className={"w-100 h-100"}>
                        <div className={"w-100 h-100 p-5 "+(!scale?"bg-dark-matte":"bg-light-matte")}>
                            <SvgFeatureImg
                                variant={'light'}
                                svgVariant={"secondary"}
                                src={"./assets/"+stringSpaceToDash(section['feature-page'].toLowerCase())+"/feature.svg"}
                            />
                        </div>
                    </div>
                    :
                    <Image
                        className="w-100"
                        src={"./assets/"+stringSpaceToDash(section['feature-page'].toLowerCase())+"/feature.jpg"}
                    />
                    }
                </div>

            </div>
        </div>
    )
}