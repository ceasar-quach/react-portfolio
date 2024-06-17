import { useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";

export default function Index (props) {
    const {
        src,
        variant,
        svgVariant
    } = props;
    const featureImg = useRef(null)
    useEffect(()=>{
        fetch(src)
        .then(res=>res.text())
        .then(content=>{
            featureImg.current.innerHTML = content;
            featureImg.current.children[0].style.fill = "url(#svgGradient)"
            featureImg.current.children[0].style.filter = "drop-shadow(var(--shadow))"
            featureImg.current.children[0].innerHTML =
                "<defs><linearGradient id='svgGradient'>"+
                    "<stop stop-color='var(--"+svgVariant+"-gradient-start)'/>"+
                    "<stop offset='100%' stop-color='var(--"+svgVariant+"-gradient-end)'/>"+
                "</linearGradient></defs>" +
                featureImg.current.children[0].innerHTML
            featureImg.current.children[0].style.width = "25%"
        })
        .catch(err=>console.log(err))
    })

    return (
    <div 
        className={"d-flex justify-content-center rounded rounded-4 drop-shadow h-100 w-100 " 
            + (variant==="dark"?"bg-dark-matte":"bg-light-matte")}
        style={{minHeight:isMobile&&200}}
        ref={featureImg}
    >
    </div>
    )
}