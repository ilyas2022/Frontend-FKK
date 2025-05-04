import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/HomePage.css'
import Header from '../components/Header'

// Importando logos de empresas
import businessInsider from '../assets/partners/businessInsider.svg'
import msn from '../assets/partners/MSN.svg'
import nbc from '../assets/partners/NBC.svg'
import businessOfHome from '../assets/partners/businessOfHome.svg'
import yahooNews from '../assets/partners/yahooNews.svg'

// Importando imágenes de ejemplos y before/after
import roomBefore from '../assets/room-before.png'
import roomExample1 from '../assets/galery/room-example-1.jpeg'
import roomExample2 from '../assets/galery/room-example-2.jpeg'
import roomExample3 from '../assets/galery/room-example-3.jpeg'
import roomExample4 from '../assets/galery/room-example-4.jpeg'
import roomExample5 from '../assets/galery/room-example-5.jpeg'
import roomExample6 from '../assets/galery/room-example-6.jpeg'
import roomExample7 from '../assets/galery/room-example-7.jpeg'
import roomExample8 from '../assets/galery/room-example-8.jpeg'

//Importando imagenes de los avatares
import avatar1 from "../assets/testimonials/ade.jpeg"
import avatar2 from "../assets/testimonials/arthur.jpg"
import avatar3 from "../assets/testimonials/eve.jpg"

const HomePage = () => {
  const navigate = useNavigate()

  const handleRedirectToLogin = () => {
    navigate('/login')
  }
  return (
    <div className="roomgpt-home">
    
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="users-badge">
              Used by over <span className="highlight">2 million people</span> to redesign homes
            </div>
            
            <h1 className="hero-title">
              Your personal <span className="highlight">AI</span><br />interior designer
            </h1>
            
            <button onClick={handleRedirectToLogin} className="cta-button">
              Redesign your room <span className="arrow-icon">→</span>
            </button>
          </div>
          
          <div className="hero-image">
            <div className="room-preview">
              <img src={roomBefore} alt="Room before" className="decoration-image" />
              
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-logos">
            <img src={businessInsider} alt="Business Insider" className="partner-logo" />
            <img src={msn} alt="MSN" className="partner-logo" />
            <img src={nbc} alt="NBC" className="partner-logo" />
            <img src={businessOfHome} alt="Business of Home" className="partner-logo" />
            <img src={yahooNews} alt="Yahoo News" className="partner-logo" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>Loved by many <span className="highlight">Worldwide.</span></h2>
            <p>See what our over 2 million users are saying about the product.</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p className="testimonial-text">"This is incredible, you don't need an interior designer anymore."</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={avatar1} alt="Ade Dada" />
                </div>
                <div className="author-info">
                  <h4>Ade Dada</h4>
                  <p>Startup Founder</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card highlight-card">
              <div className="rating">★★★★★</div>
              <p className="testimonial-text">"Finally! Something to help me get over my indecisiveness when decorating my house!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                   <img src={avatar2} alt="Arthur Dvorkin" />
                </div>
                <div className="author-info">
                  <h4>Arthur Dvorkin</h4>
                  <p>Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p className="testimonial-text">"I haven't changed my room layout for 5 years, but this app may change that. Great job."</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src={avatar3} alt="Rob Attfield" />
                </div>
                <div className="author-info">
                  <h4>Rob Attfield</h4>
                  <p>Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <h2>Rooms that <span className="highlight">Roomio AI</span> created</h2>
          <div className="gallery-carousel">
            <div className="carousel-track">
              <div className="carousel-slide">
                <img src={roomExample1} alt="Room Example 1" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample2} alt="Room Example 2" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample3} alt="Room Example 3" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample4} alt="Room Example 4" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample5} alt="Room Example 5" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample6} alt="Room Example 6" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample7} alt="Room Example 7" />
              </div>
              <div className="carousel-slide">
                <img src={roomExample8} alt="Room Example 8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section className="transform-section">
        <div className="transform-container">
          <div className="transform-content">
            <div className="transform-text">
              <h2><span className="highlight">Transform any room</span> with just one photo</h2>
              <p>See what our over 2 million users are saying about the product.</p>
              <Link to="/login" className="cta-button">
                Redesign your room <span className="arrow-icon">→</span>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="roomgpt-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-powered">
              Powered by <a href="#" rel="noopener noreferrer">Replicate</a> and <a href="#" rel="noopener noreferrer">Bytescale</a>
            </div>
            <div className="footer-creator">
              Created by <a href="#" rel="noopener noreferrer">Ilyas</a> (ilyas@romio.io)
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
