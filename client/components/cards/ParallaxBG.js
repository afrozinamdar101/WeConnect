import { useContext } from "react";

const ParallaxBG = ({ url, children = "WeConnect" }) => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundAttachment: "fixed",
        padding: "100px 0px 75px 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <div className="Logo">
        <img src="/images/logo.png" alt="logo_big" />
        <h1 className="display-1 font-weight-bold "style={{ color: "gold", textShadow: "4px 4px 4px #2c4fd0" }}>
         
          {children}
        </h1>
        
      </div>
      <div className="sjsu">
        <h4 className="font-weight-bold "style={{ color: "#2c4fd0", textShadow: "4px 4px 4px gold" }}>San Jose State University</h4>
      </div>
    </div>
    
  );
};

export default ParallaxBG;
