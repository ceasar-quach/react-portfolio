import { useEffect } from "react";
import Container from "./section"
import { isMobile } from "react-device-detect";

export default function Index (props) {
    const {
        index,
        contentOf,
        toTitleCase,
        projects,
        activeKey,
        stringSpaceToDash,
        setActiveKey,
        scrollToPosition,
        shortcutButton,
    } = props;
    useEffect(()=>{
        scrollToPosition('top');
        (index===0||contentOf['dynamic-children'].some(sections=>
            sections['dynamic-children'].some(section=>
                projects.map(project=>stringSpaceToDash(project.page.toLowerCase()))
                .indexOf(section['feature-page']&&stringSpaceToDash(section['feature-page'].toLowerCase()))>=0)))&&
        setActiveKey(index===0?"/":"/"+stringSpaceToDash(contentOf.page.toLowerCase()))
    })
    return (
        contentOf['dynamic-children'].map((section, index)=>
        <Container
            bgImage={
                section.bgImg&&'./assets/'
                +stringSpaceToDash(contentOf.page.toLowerCase())
                +"/"+stringSpaceToDash(section.title.toLowerCase())
                +'.jpg'
            }
            id={stringSpaceToDash(section.title.toLowerCase())}
            title={index!==0&&toTitleCase(section.title)}
            key={index}
            index={index}
            scrollToPosition={scrollToPosition}
            markdown={section.markdown&&stringSpaceToDash(section.title.toLowerCase())+"-carousel.md"}
            page={stringSpaceToDash(contentOf.page.toLowerCase())}
            setActiveKey={setActiveKey}
            activeKey={activeKey}
            stringSpaceToDash={stringSpaceToDash}
            toTitleCase={toTitleCase}
            style={(isMobile&&section['override-style-mobile'])||section['override-style']}
            projects={projects}
            demoUrl={contentOf.demoUrl}
            className={section['override-class']}
            withFilter={section.withFilter}
            shortcutButton={shortcutButton}
        >
            {section['dynamic-children']||section['dynamic-text']}
        </Container>
        )
    )
}