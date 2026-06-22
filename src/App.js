import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { Compass, Eye, Heart, Milestone, Shield, Layers, Mail, FileText, ArrowRight, Video, ArrowUp, ImageIcon, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Create an explicit Webpack context map directly into your root imgs/ directory
const imageContext = require.context('../imgs', false, /\.(png|jpe?g|svg)$/);

export default function App() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Gallery visibility and index management states
  const [showPIGallery, setShowPIGallery] = useState(false);
  const [showCMGallery, setShowCMGallery] = useState(false);
  const [visiblePICount, setVisiblePICount] = useState(5);
  const [visibleCMCount, setVisibleCMCount] = useState(5);
  
  // Dynamic Lightbox Target Trackers
  const [activeGalleryType, setActiveGalleryType] = useState(null); // 'PI' or 'CM'
  const [currentImgIndex, setCurrentImgIndex] = useState(null);
  
  // Magnification & Dragging States
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // MVP 1 - Presque Isle reference image strings
  const presqueIsleImages = [
    'PXL_20260607_215638440.MP.jpg',
    'PXL_20260607_215640419.jpg',
    'PXL_20260607_215732632.MP.jpg',
    'PXL_20260607_215752996.MP.jpg',
    'PXL_20260607_220119190.MP.jpg',
    'PXL_20260607_220129969.jpg',
    'PXL_20260607_220141842.MP.jpg',
    'PXL_20260607_220305526.jpg',
    'PXL_20260607_220318835.jpg',
    'PXL_20260607_220328070.jpg',
    'PXL_20260607_220448682.MP.jpg',
    'PXL_20260607_220456120.jpg',
    'PXL_20260607_220513093.MP.jpg',
    'PXL_20260607_220518376.jpg',
    'PXL_20260607_220519728.jpg'
  ];

  // MVP 3 - Cascading Motion highlighted reference image strings
  const cascadingMotionImages = [
    'PXL_20260607_215638440.MP.jpg',
    'PXL_20260607_215640419.jpg',
    'PXL_20260607_215732632.MP.jpg',
    'PXL_20260607_215752996.MP.jpg',
    'PXL_20260607_220119190.MP.jpg',
    'PXL_20260607_220141842.MP.jpg'
  ];

  const activeImageSet = activeGalleryType === 'CM' ? cascadingMotionImages : presqueIsleImages;

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (window.scrollY > heroHeight) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resetZoomMetrics = () => {
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const closeLightbox = useCallback(() => {
    setCurrentImgIndex(null);
    setActiveGalleryType(null);
    resetZoomMetrics();
  }, []);

  const handleNextImg = useCallback(() => {
    setCurrentImgIndex((prev) => (prev + 1) % activeImageSet.length);
    resetZoomMetrics();
  }, [activeImageSet.length]);

  const handlePrevImg = useCallback(() => {
    setCurrentImgIndex((prev) => (prev - 1 + activeImageSet.length) % activeImageSet.length);
    resetZoomMetrics();
  }, [activeImageSet.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentImgIndex === null) return;
      if (e.key === 'ArrowRight') handleNextImg();
      if (e.key === 'ArrowLeft') handlePrevImg();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImgIndex, closeLightbox, handleNextImg, handlePrevImg]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowMorePI = () => {
    const currentScrollY = window.scrollY;
    setVisiblePICount((prev) => Math.min(prev + 5, presqueIsleImages.length));
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' });
    });
  };

  const handleShowMoreCM = () => {
    const currentScrollY = window.scrollY;
    setVisibleCMCount((prev) => Math.min(prev + 5, cascadingMotionImages.length));
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' });
    });
  };

  const togglePIGallery = () => {
    const currentScrollY = window.scrollY;
    setShowPIGallery(!showPIGallery);
    if (!showPIGallery) {
      setVisiblePICount(5);
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' });
    });
  };

  const toggleCMGallery = () => {
    const currentScrollY = window.scrollY;
    setShowCMGallery(!showCMGallery);
    if (!showCMGallery) {
      setVisibleCMCount(5);
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' });
    });
  };

  const imageContextResolve = (fileName) => {
    try {
      return imageContext(`./${fileName}`);
    } catch (err) {
      console.error(`Asset path extraction fault: ${fileName}`, err);
      return null;
    }
  };

  const openLightbox = (galleryType, index) => {
    setActiveGalleryType(galleryType);
    setCurrentImgIndex(index);
    resetZoomMetrics();
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="site-wrapper">
      
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Compass className="nav-logo" size={24} />
            <span className="nav-title">The Immersive Horizon Foundation</span>
          </div>
          <div className="nav-links">
            <a href="#mission">Our Vision</a>
            <a href="#experiences">Marquette Prototypes</a>
            <a href="#roadmap">Project Roadmap</a>
            <a href="#framework">How We Operate</a>
          </div>
          <div>
            <a href="#contact" className="btn-nav">Partner With Us</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero">
        <div className="hero-content">
          <span className="badge">Lead by Northern Michigan University Student's</span>
          <h1>Dismantling Physical Barriers to the Great Outdoors</h1>
          <p>
            We build high-fidelity, 3D virtual nature experiences designed to reduce isolation and clinical anxiety for seniors, veterans, and individuals with limited mobility.
          </p>
          <div className="hero-actions">
            <a href="#experiences" className="btn-primary">
              See the Prototypes <ArrowRight size={16} />
            </a>
            <a href="#roadmap" className="btn-secondary">Explore Our Roadmap</a>
          </div>
        </div>
      </header>

      {/* --- MISSION PHILOSOPHY --- */}
      <section id="mission" className="section-container">
        <div className="section-header">
          <h2>Our Dual Approach</h2>
          <div className="divider"></div>
        </div>
        
        <div className="grid-two">
          <div className="card-mission">
            <div className="icon-wrapper">
              <Eye size={24} />
            </div>
            <h3>Technical Precision</h3>
            <p>
              We shoot crisp 8K video and hyper-detailed 8-14K stereoscopic 3D photos using specialized hardware systems. Combined with realistic spatial audio, we deliver a true sense of presence.
            </p>
          </div>

          <div className="card-mission">
            <div className="icon-wrapper">
              <Heart size={24} />
            </div>
            <h3>Real Human Impact</h3>
            <p>
              Physical limits shouldn't mean missing out on nature. By creating an immersive portal to iconic landscapes, we offer a calming escape that reduces anxiety and allows elders and veterans to revisit meaningful environments.
            </p>
          </div>
        </div>
      </section>

      {/* --- INITIAL EXPERIENCES (THE 3 MVPs) --- */}
      <section id="experiences" className="dark-section">
        <div className="section-container">
          <div className="section-header">
            <h2>The Marquette MVP Series</h2>
            <p>Our initial minimum viable products focus on capturing diverse natural textures and vistas right here in Marquette, optimized directly for mobile and all-in-one devices.</p>
          </div>

          <div className="grid-three">
            
            {/* MVP 1 - PRESQUE ISLE */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">01 / Presque Isle</span>
                <h3>The Rugged Coastline</h3>
                <p>
                  A 3-to-6 minute immersive experience capturing stationary 8-14K 3D photos and smooth 8K video. It tests deep visual horizons and high-contrast environments where volcanic rocks meet open water.
                </p>
                
                <button 
                  className={`btn-gallery-toggle ${showPIGallery ? 'active' : ''}`}
                  onClick={togglePIGallery}
                >
                  <ImageIcon size={16} />
                  <span>{showPIGallery ? 'Hide Location References' : 'View Location References'}</span>
                  <ChevronDown size={16} className="arrow-icon" />
                </button>
                <h6 className="reference-disclaimer"><i>References are not used in the final experiences</i></h6>

                {showPIGallery && (
                  <div className="gallery-dropdown-wrapper">
                    <div className="gallery-header">
                      <span>Showing {Math.min(visiblePICount, presqueIsleImages.length)} of {presqueIsleImages.length} Location References</span>
                    </div>
                    <div className="mvp-image-grid">
                      {presqueIsleImages.slice(0, visiblePICount).map((imgName, index) => {
                        const imgSrc = imageContextResolve(imgName);
                        return (
                          <div 
                            key={index} 
                            className="thumb-wrapper"
                            onClick={() => openLightbox('PI', index)}
                            title={`View location reference ${imgName}`}
                          >
                            {imgSrc && (
                              <img 
                                src={imgSrc} 
                                alt={`Presque Isle Location Asset Reference ${index + 1}`} 
                                loading="lazy"
                              />
                            )}
                            <span className="thumb-index">{String(index + 1).padStart(2, '0')}</span>
                          </div>
                        );
                      })}
                    </div>

                    {visiblePICount < presqueIsleImages.length && (
                      <button className="btn-gallery-more" onClick={handleShowMorePI}>
                        Show More References
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8K Video / 8-14K Photo</span>
                </div>
                <span>Mobile/All in One Optimized</span>
              </div>
            </div>

            {/* MVP 2 - SUGARLOAF CANOPY */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">02 / Sugarloaf Mountain</span>
                <h3>The Forest Canopy</h3>
                <p>
                  High-density visual capture focusing on intricate pine clusters and dynamic natural lighting. Designed with layered wind audio loops to cultivate mindfulness and a deep sense of calm.
                </p>
                <h6 className="reference-disclaimer empty"><i>No references available for this MVP yet</i></h6>
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8-14K Stills & Audio</span>
                </div>
                <span>Mobile/All in One Optimized</span>
              </div>
            </div>

            {/* MVP 3 - CASCADING MOTION */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">03 / Local Waterways</span>
                <h3>Cascading Motion</h3>
                <p>
                  A study in environmental synchronization, fine-tuning hardware tracking against fast-moving water rapids to ensure the virtual experience feels completely natural and fluid.
                </p>

                <button 
                  className={`btn-gallery-toggle ${showCMGallery ? 'active' : ''}`}
                  onClick={toggleCMGallery}
                >
                  <ImageIcon size={16} />
                  <span>{showCMGallery ? 'Hide Location References' : 'View Location References'}</span>
                  <ChevronDown size={16} className="arrow-icon" />
                </button>
                <h6 className="reference-disclaimer"><i>References are not used in the final experiences</i></h6>

                {showCMGallery && (
                  <div className="gallery-dropdown-wrapper">
                    <div className="gallery-header">
                      <span>Showing {Math.min(visibleCMCount, cascadingMotionImages.length)} of {cascadingMotionImages.length} Highlighted Location Targets</span>
                    </div>
                    <div className="mvp-image-grid">
                      {cascadingMotionImages.slice(0, visibleCMCount).map((imgName, index) => {
                        const imgSrc = imageContextResolve(imgName);
                        return (
                          <div 
                            key={index} 
                            className="thumb-wrapper"
                            onClick={() => openLightbox('CM', index)}
                            title={`View location reference ${imgName}`}
                          >
                            {imgSrc && (
                              <img 
                                src={imgSrc} 
                                alt={`Location Environmental Tracker Asset ${index + 1}`} 
                                loading="lazy"
                              />
                            )}
                            <span className="thumb-index">{String(index + 1).padStart(2, '0')}</span>
                          </div>
                        );
                      })}
                    </div>

                    {visibleCMCount < cascadingMotionImages.length && (
                      <button className="btn-gallery-more" onClick={handleShowMoreCM}>
                        Show More References
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8-14K Looping Asset</span>
                </div>
                <span>Mobile/All in One Optimized</span>
              </div>
            </div>

            <div className="gallery-disclaimer">
              <p><i>All reference images are for demonstration purposes only and are not included in the final immersive experiences. They serve to illustrate the types of locations and visual fidelity we aim to achieve.</i></p>
              <p><i>Final experiences will be optimized for performance and comfort on target VR hardware, ensuring a seamless and impactful user experience.</i></p>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOUR PHASE STRATEGIC ROADMAP --- */}
      <section id="roadmap" className="section-container">
        <div className="section-header">
          <h2>Strategic Implementation Plan</h2>
          <p>A clear, four-stage strategy to transform local production into a verified, impactful therapeutic tool.</p>
        </div>

        <div className="timeline">
          <div className="timeline-item active">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 01 / Current</span>
            <h4>Proof of Concept & MVP Construction</h4>
            <p>
              Building initial 3-to-6 minute prototypes using local assets. These serve as our core master keys for demonstrations, showcasing the project academically at Northern Michigan University to attract initial funding.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 02</span>
            <h4>Academic Validation & Research</h4>
            <p>
              Collaborating with the NMU Psychology department to study the emotional and cognitive impacts of "virtual nature immersion." Launching local pilot programs using headsets in eldercare facilities and mobility-limited clinics.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 03</span>
            <h4>Sponsorships & Corporate Alliances</h4>
            <p>
              Leveraging our pilot results to offer high-value case studies to camera manufacturers and global healthcare groups—showing how hardware can tell powerful, life-changing human stories.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 04</span>
            <h4>Corporate Restructuring</h4>
            <p>
              Establishing a 501(c)(3) non-profit organization alongside our existing LLC. This framework isolates development intellectual property while enabling us to accept larger institutional grants and public donations.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORPORATE STRUCTURE PREVIEW --- */}
      <section id="framework" className="gray-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Operational Framework</h2>
            <p>Balancing technical software production with public delivery and clinical research entities.</p>
          </div>

          <div className="grid-two" style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div className="arch-card">
              <div>
                <div className="arch-header foundation">
                  <Shield size={20} />
                  <span>The Non-Profit Arm</span>
                </div>
                <p>
                  <strong>The Immersive Horizon Foundation</strong> acts as our community and clinical outreach wing, designed to coordinate with healthcare networks, handle federal grants, and accept formal public donations.
                </p>
              </div>
              <span className="arch-status">Future Goal: 501(c)(3) Integration</span>
            </div>

            <div className="arch-card">
              <div>
                <div className="arch-header backbone">
                  <Layers size={20} />
                  <span>The Creative Backbone</span>
                </div>
                <p>
                  <strong>Satyrn Studios LLC</strong> functions as the foundational development studio. It handles technical asset capture, software processing, deployment pipelines, and manages core intellectual property assets.
                </p>
              </div>
              <span className="arch-status">Active: Operations & Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENGAGEMENT / PORTAL CONTACT --- */}
      <section id="contact" className="section-container">
        <div className="contact-block">
          <div className="grid-split">
            <div className="contact-info">
              <h3>Get Involved</h3>
              <p>
                Whether you are an academic researcher interested in running a pilot study, a healthcare provider, or a hardware manufacturer looking to collaborate, let's talk.
              </p>
              <div className="contact-details">
                <div className="detail-line">
                  <Mail size={14} />
                  <span>tylerdev@tylerthedev.xyz</span>
                </div>
                <div className="detail-line">
                  <FileText size={14} />
                  <span>Marquette, MI (NMU Campus)</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {contactSubmitted ? (
                <div className="success-box">
                  <div className="success-icon">
                    <Milestone size={32} />
                  </div>
                  <h4>Message Received</h4>
                  <p>Thanks for reaching out. We will get back to you soon regarding your project alignment criteria.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name / Institution</label>
                    <input type="text" required placeholder="e.g., NMU Psychology Dept / Facility Name" />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" required placeholder="name@institution.edu" />
                  </div>
                  <div className="form-group">
                    <label>How would you like to collaborate?</label>
                    <textarea rows="3" required placeholder="Tell us briefly about your research interests or sponsorship ideas..."></textarea>
                  </div>
                  <div className="form-actions-row">
                    <button type="submit" className="btn-submit">Send Message</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <p><strong>The Immersive Horizon Foundation</strong></p>
            <p>Production and technical pipelines managed by Satyrn Studios LLC.</p>
          </div>
          <div className="footer-right">
            <p>&copy; {new Date().getFullYear()} Satyrn Studios LLC. All rights reserved.</p>
            <p className="footer-subtext">Marquette, Upper Peninsula, Michigan.</p>
          </div>
        </div>
      </footer>

      {/* --- INTERACTIVE LIGHTBOX MODAL --- */}
      {currentImgIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          
          {/* Top Panel Actions & Counters */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              Reference File Asset: {currentImgIndex + 1} / {activeImageSet.length}
            </span>
            <div className="lightbox-actions">
              <button className="action-btn" onClick={toggleZoom} title={isZoomed ? "Reset View" : "Magnify Image"}>
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                <span>{isZoomed ? "Reset Scale" : "Magnify"}</span>
              </button>
              <button className="close-btn" onClick={closeLightbox}>✕</button>
            </div>
          </div>

          {/* Reverse Shifter Control Button */}
          <button 
            className="nav-arrow left" 
            onClick={(e) => { e.stopPropagation(); handlePrevImg(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Core Display Arena */}
          <div 
            className={`lightbox-viewport ${isZoomed ? 'zoomed' : ''} ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img 
              src={imageContextResolve(activeImageSet[currentImgIndex])} 
              alt="Expanded Location Landscape View" 
              draggable="false"
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: isZoomed 
                  ? `translate(${panOffset.x}px, ${panOffset.y}px) scale(2.2)` 
                  : 'none'
              }}
            />
          </div>

          {/* Next Shifter Control Button */}
          <button 
            className="nav-arrow right" 
            onClick={(e) => { e.stopPropagation(); handleNextImg(); }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
          
        </div>
      )}

      {/* --- BACK TO TOP FLOATING BUTTON --- */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
}
