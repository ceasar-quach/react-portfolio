import React, {useState} from 'react';
import { Parallax } from 'react-parallax';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import LogoTitle from '../local-components/logo-title';
import FeatureCard from '../local-components/featureCard';
import TextContainer from '../local-components/textContainer';
import DescriptionCard from '../local-components/descriptionCard';
import Banner from '../local-components/banner';
import Catalogue from '../local-components/catalogue';
import ProgressTracker from '../local-components/progress-tracker';
import { isMobile } from 'react-device-detect';

export default function Index (props) {

const {
    id,
    title,
    index,
    bgImage,
    className,
    page,
    activeKey,
    scrollToPosition,
    children,
    stringSpaceToDash,
    toTitleCase,
    projects,
    withFilter,
    style,
    demoUrl,
    shortcutButton
} = props;
const [radioValue, setRadioValue] = useState("all");
return(
    <Parallax 
        bgImage={bgImage}
        style={{background:!bgImage&&"transparent"}} 
        bgImageStyle={{backgroundPosition:'center'}} 
        bgImageSize='cover'
    >
    <div 
        id={id} 
        className={(!(isMobile&&index!==0)&&'h-100vh')+' py-5 px-4 d-flex flex-column align-items-around '+(bgImage&&'shadow-overlay '+className)}
        style={{...style}}
    >
        {withFilter?
        <ButtonGroup className="mb-2 drop-shadow bg-dark-matte p-1 rounded-3 transition-ease col-xl-5 col-md-12">
        {["all", ...new Set(projects.map(project=>project.category))].map((radio, index) => 
        <ToggleButton
            key={index}
            type="radio"
            className={'border-0 transition-ease secondary-font '+(radioValue === radio?'bg-ocean':'bg-dark-matte link-info')}
            onClick={() => setRadioValue(radio)}
          >
            {toTitleCase(radio)}
          </ToggleButton>

        )}
      </ButtonGroup>
        :
        title&&<h3 className='text-white underline-border-left mb-4 ms-5'>{title}</h3>
        }
        <div className='row m-0'
        style={{height: '90%'}}
        >
            {children.map((section, index)=>
                <React.Fragment key={index}>
                    {{
                    // headers components
                    'logo-title': 
                    <LogoTitle
                        section={section}
                        page={page}
                        scrollToPosition={scrollToPosition}
                        stringSpaceToDash={stringSpaceToDash}
                    />,
                    'banner':
                    <Banner
                        key={index}
                        activeKey={activeKey}
                        page={page}
                        section={section}
                        demoUrl={demoUrl}
                        shortcutButton={shortcutButton}
                    />,
                    
                    // body components
                    // FeatureCard and Catalogue will retain a copy of all projects objects within itself
                    'feature-card':
                    <FeatureCard 
                        key={index}
                        stringSpaceToDash={stringSpaceToDash}
                        featurePage={section['feature-page']}
                        projects={projects}
                        featureMarkdown={section.featureMarkdown}
                    />,
                    'catalogue':
                    <Catalogue
                        key={index}
                        section={section}
                        projects={projects}
                        radioValue={radioValue}
                        toTitleCase={toTitleCase}
                        stringSpaceToDash={stringSpaceToDash}
                    />,
                    'text':
                    <TextContainer
                        key={index}
                        section={section}
                        page={page}
                        title={title}
                        stringSpaceToDash={stringSpaceToDash}
                    />,
                    'description-card':
                    <DescriptionCard
                        key={index}
                        section={section}
                        page={page}
                        stringSpaceToDash={stringSpaceToDash}
                    />,                    
                    'progress-tracker':
                    <ProgressTracker
                        key={index}
                        total={children.length}
                        index={index}
                        section={section}
                        page={page}
                        title={title}
                        stringSpaceToDash={stringSpaceToDash}
                    />,
                    }[section['display-type']]}
                </React.Fragment >
            )}
            </div>
        </div>
    </Parallax>
)}