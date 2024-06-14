import { Nav } from "react-bootstrap"

export default function Index (props) {
    const {
        extSrc,
        toTitleCase
    } = props;
    return (
        <div 
            id="footer" 
            className="px-4 row m-0 text-light align-items-center justify-content-around"
            style={{background: "rgba(0,0,0,0.8)"}}
        >
            <div 
                className="col-md-4 col-12 h-100 row align-items-center my-4 py-4 rounded rounded-3 drop-shadow"
                style={{background: 'rgba(255,255,255,0.2)'}}
            >
                <div className="">
                    <h5>Contact</h5>
                    {extSrc['contact'].map((method, index)=>
                        <p className="m-0" key={index}><span>{toTitleCase(method.source)}</span>: <a className="link-info" href={method.source==="email"?
                                "mailto:"+method.source.toLowerCase()
                                :
                                "tel:"+method.source.toLowerCase()
                            }>{method.contact}</a>
                        </p>
                    )}
                </div>
            </div>
            <div className="col-auto row mx-0 justify-content-center">
                <div className="col-auto text-center">
                <h5>Follow me on</h5>
                <Nav className="d-flex justify-content-center">
                    {extSrc['social-media'].map((link, index)=>
                    <Nav.Item key={index}>
                        <Nav.Link href={link.url} target="_blank">
                            <i className={"link-info fa-brands fa-"+link.source}></i>
                        </Nav.Link>
                    </Nav.Item>
                    )}
                </Nav>
                <p className="m-0">© 2021 Copyright Thanh Quach. All right reserved.</p>
                </div>
            </div>
        </div>
    )
}