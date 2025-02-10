import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
        <div className="container">
            <div className="box">
                <p className="text">
                    The site was designed and implemented by Mohamed Elshafey
                </p>
                <p className="text">
                    Contact me via email or social media                
                </p>
                <ul className="social">
                    <li>
                        <a href="https://www.linkedin.com/in/mohamed-elshafey-381401216/" target="_blank" className="linkedin" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Mohamed176b" target="_blank"  className="github" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100018162397224" target="_blank" className="facebook" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:Beta.ContactEM@gmail.com" className="gmail">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="box footer-gallery">
                <img src="%PUBLIC_URL%/imgs/egg.png" alt="img" />
                <h3>Rooten <span className="eggs-foot">Eggs</span></h3>
            </div>
        </div>
        <p className="copyright">Powerd By Elshafey <span>&#10084;</span></p>
    </div>
  )
}

export default Footer