import { TypeAnimation } from 'react-type-animation';

export default function Index ({children}) {

  
    return (
        <TypeAnimation
          sequence={children}
          wrapper="span"
          speed={70}
          className="d-inline-block secondary-font"
          style={{ fontSize: '1.6em'}}
        />
      );
}