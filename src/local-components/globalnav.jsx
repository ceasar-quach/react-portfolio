import { Nav, Navbar, Container, Button, Offcanvas } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { isMobile } from "react-device-detect";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Index (props) {
    const {
        navEntries, 
        toTitleCase, 
        stringSpaceToDash, 
        scrollToPosition,
        activeKey,
        setActiveKey,
        forwardRef
    } = props;
    const navigate = useNavigate();
    const [expandNav, setExpandNav] = useState(false)
    
    return (
        <Navbar 
            data-bs-theme="dark"
            expand="lg"
            className="bg-none transition-ease"
            style={{right:'0'}}
            ref={forwardRef}
            fixed="top"
            expanded={isMobile&&expandNav}
        >
            <Container className="justify-content-end bg-none">
            <Navbar.Toggle aria-controls="navbar" onClick={()=>setExpandNav(!expandNav)} />
            <Navbar.Offcanvas id="navbar" placement="end">
                {isMobile&&<Offcanvas.Header className="d-flex justify-content-end bg-dark-matte">
                    <Button variant="null" onClick={()=>setExpandNav(!expandNav)} >
                        <FontAwesomeIcon icon={faTimes} className="link-info"/>
                    </Button>
                </Offcanvas.Header>}
                <Offcanvas.Body className={"justify-content-end "+(isMobile&&"text-bg-dark bg-dark-matte")}>
                    <Nav
                        activeKey={activeKey}
                        variant="underline"
                        onSelect={(selectedKey) => {navigate(selectedKey)}}
                    >
                        {navEntries.map((entry, index)=>
                        <Nav.Link
                            eventKey={index===0?"/":"/"+stringSpaceToDash(entry.toLowerCase())}
                            key={index}
                            onClick={()=>{
                                scrollToPosition('top')
                                setActiveKey(index===0?"/":"/"+stringSpaceToDash(entry.toLowerCase()))
                                setExpandNav(!expandNav)
                            }}
                        >{toTitleCase(entry)}
                        </Nav.Link>
                        )}
                        <Button 
                            variant="outline-info secondary-font"
                            onClick={()=>{scrollToPosition('bottom'); setExpandNav(!expandNav)}}
                        >Contact
                        </Button>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}