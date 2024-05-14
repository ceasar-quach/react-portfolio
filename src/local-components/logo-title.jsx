import TypeStrings from '../external-components/typeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export default function Index (props) {

const {
    section,
    page,
    scrollToPosition,
    stringSpaceToDash
} = props

return (
<div 
    className={'d-flex flex-column mx-auto '+section["override-class"]??""}
    style={{...section['override-style']??[], maxWidth: '1200px'}}
>
    <div className='flex-fill row col-10 mx-auto align-items-center justify-content-center'>
        {section.withImg&&
        <div className='p-0 col-xl-3 order-2'>
            <Image
                src={'./assets/'+page+'/'+stringSpaceToDash(section.title)+"-logo.jpg"}
                roundedCircle
                className='drop-shadow w-100'
            />
        </div>
        }
        <div className={{
            'center':'col-12 text-center order-3 mt-3',
            'left':'col-xxl-4 col-xl-5 order-3 ms-md-5 ms-sm-0',
            'right':'col-xxl-4 col-xl-5 me-md-5 me-sm-0'
        }[section.direction] + " text-info " + (isMobile&&" text-center h-25")}>
            {section.title&&<h1 className='text-silver'>{section.title}</h1>}
            {section['dynamic-text']&&<TypeStrings>{section['dynamic-text']}</TypeStrings>}
        </div>
    </div>
    <Link
        onClick={scrollToPosition}
        className='d-flex align-items-center pointer text-light blink infinite mx-auto'>
        <h5 className='m-0 me-3 '>Featuring</h5>
        <FontAwesomeIcon icon={faArrowAltCircleDown}/>
    </Link>
</div>
)}