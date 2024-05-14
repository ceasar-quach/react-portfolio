import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "react-bootstrap";
import ParticlesWrapper from "./external-components/particles";
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

// templates
import Globalnav from './local-components/globalnav';
import Page from './page';
import Footer from './local-components/footer';

//all css library used
import 'bootstrap/dist/css/bootstrap.min.css';
import 'simplebar-react/dist/simplebar.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.sass';

//all custom function
import { toTitleCase, stringSpaceToDash } from "./local-functions/text-transform";

function App() {
  const [siteNavigations, setSiteNavigations] = useState();
  const [activeKey, setActiveKey] = useState("/");
  const [extSrc, setExtSrc] = useState();
  const simpleBarContainer = useRef(null);
  const scrollTopButton = useRef(null);
  const shortcutButton = useRef(null);
  const navBarBg = useRef();
  const scrollElement = simpleBarContainer.current&&simpleBarContainer.current.getScrollElement()
  const scrollToPosition = async (position) => {
    scrollElement.style.scrollBehavior = await 'smooth'
    switch(position) {
      case 'top':
        scrollElement.scrollTop = await 0;
        scrollElement.style.scrollBehavior = await 'auto'
        break
      case 'bottom':
        scrollElement.scrollTop = await scrollElement.scrollHeight
        scrollElement.style.scrollBehavior = await 'auto'
        break
      default:
        scrollElement.scrollTop = await scrollElement.offsetHeight
        scrollElement.style.scrollBehavior = await 'auto'
        break

    }
  }

  useEffect(() => {
    document.title = "Thanh Quach | Not an ordinary Tech guy"
  })
  useEffect(()=>{
    //main structure of the site
      fetch('./site-navigation.json')
      .then(res=>res.json())
      .then(res=>setSiteNavigations(res))
      .catch(err=>console.log(err))

    //social media links and contacts
      fetch('./external-links.json')
      .then(res=>res.json())
      .then(res=>setExtSrc(res))
      .catch(err=>console.log(err))
  },[])

  scrollElement&&scrollElement.addEventListener('scroll', ()=>{
    if(scrollElement.scrollTop > 100)
      {
        scrollTopButton.current.style.display = "block"
        if(shortcutButton.current){
          shortcutButton.current.classList.add('fixed-top','bg-gradient-black-left','p-3','col-6')
          shortcutButton.current.classList.remove('drop-shadow')
        }
        navBarBg.current.classList.add("bg-gradient-black-right")
      }else{
        scrollTopButton.current.style.display = "none"
        if(shortcutButton.current){
          shortcutButton.current.classList.remove('fixed-top','bg-gradient-black-left', 'p-3' ,'col-6')
          shortcutButton.current.classList.add('drop-shadow')
        }
        navBarBg.current.classList.remove("bg-gradient-black-right")

      }
  })

  return (
      // Ensure all resource are loaded before render the WebUI
      <Router>
          <ParticlesWrapper/>
          <div 
            className='App'
          >
          <SimpleBar 
            style={{maxHeight:'100vh'}} 
            ref={simpleBarContainer}
          >
          {siteNavigations&&extSrc&&
          <Globalnav 
            navEntries={siteNavigations.filter(entry=>!entry.project).map(navigationTo=>
              navigationTo.page
            )}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            extSrc={extSrc}
            stringSpaceToDash={stringSpaceToDash}
            toTitleCase={toTitleCase}
            scrollToPosition={scrollToPosition}
            forwardRef={navBarBg}
          />}
           {siteNavigations&&
            <Routes>
              {siteNavigations.map((navigationTo, index)=>
                <Route 
                  key={index}
                  path={index===0?"/":"/"+stringSpaceToDash(navigationTo.page.toLowerCase())}
                  exact={index===0} 
                  element={
                    <Page
                      index={index}
                      activeKey={activeKey}
                      contentOf={navigationTo}
                      projects={siteNavigations.filter(page=>page.project)}
                      toTitleCase={toTitleCase}
                      setActiveKey={setActiveKey}
                      scrollToPosition={scrollToPosition}
                      stringSpaceToDash={stringSpaceToDash}
                      shortcutButton={shortcutButton}
                    />
                    } 
                />)}
            </Routes>}
          {extSrc&&<Footer
            extSrc={extSrc}
            toTitleCase={toTitleCase}
          />}
          </SimpleBar>
          <Button 
              onClick={()=>scrollToPosition('top')}
              className="fixed-bottom m-3 ms-auto bg-dark border-0 drop-shadow" 
              style={{width: 50, display:"none"}}
              ref={scrollTopButton}
            >
                <FontAwesomeIcon icon={faChevronUp} />
            </Button>
          </div>
      </Router>
  )
}

export default App;
