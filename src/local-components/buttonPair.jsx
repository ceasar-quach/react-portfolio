import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

export default function Index (props) {

const {
    localUrl,
    localLabel,
    demoUrl,
    shortcutButton,
    zIndex
} = props

return(
    <div className="col-auto bg-dark-matte p-2 rounded-3 drop-shadow transition-ease" style={{zIndex:zIndex??1031}} ref={shortcutButton} >
        {localUrl&&<Link to={localUrl} className="me-2 link-info">
            {localLabel??"Read description"}
        </Link>}
        {demoUrl&&<Link to={demoUrl} target="_blank">
            <Button className="bg-ocean border-0 rounded-3"><span>View Demo</span></Button>
        </Link>}
    </div>
    )
}