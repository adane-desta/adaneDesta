import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import '../stylesheet_files/footerstyle.css'


function Footer(){

    return(
        <footer className="footer">
        <div>
            <div className="footerparent">
                <div className="links">
                    <h4>Quick links</h4>
                     <a href="../html-files/homepage.html">home</a>
                     <a href="../html-files/aboutPage.html">About</a>
                     <a href="../html-files/resources.html">Resources</a>
                     <a href="../html-files/consult_vet.html">Consult veternerian</a>
                     <a href="../html-files/news_and_event.html">news and events</a>
                     <a href="../html-files/join-us.html">Join Us</a>
                     
                </div>
               
    
              <div className="links">
                <h4>Follow Us On:</h4>
                <a href="">facebook</a>
                <a href="">telegram</a>
                <a href="">twiter</a>
                <a href="">whatsapp</a>
              </div>
            
            </div>
            
            
        </div>
        
        <p>&copy;  2024 Animal Health Advisory System. All Rights Reserved. <br></br> Developed by Adane Desta Jimma University</p>
      </footer>
    );
}

createRoot(document.getElementById("footer")).render(
    <StrictMode>
        <Footer/>
    </StrictMode>
)
