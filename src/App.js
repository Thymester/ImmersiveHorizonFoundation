import React, { useState } from 'react';
import './App.css';
import { Compass, Eye, Heart, Milestone, Shield, Layers, Mail, FileText, ArrowRight, Video } from 'lucide-react';

export default function App() {
  const [contactSubmitted, setContactSubmitted] = useState(false);

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
          <span className="badge">Lead by Northern Michigan University Student(s)</span>
          <h1>Bringing the Great Outdoors to Those Bound by Walls</h1>
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
            <p>Our initial minimum viable products focus on capturing diverse natural textures and vistas right here in Marquette, optimized directly for the Meta Quest 2 headset.</p>
          </div>

          <div className="grid-three">
            {/* MVP 1 */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">01 / Presque Isle</span>
                <h3>The Rugged Coastline</h3>
                <p>
                  A 3-to-6 minute immersive experience capturing stationary 8-14K 3D photos and smooth 8K video. It tests deep visual horizons and high-contrast environments where volcanic rocks meet open water.
                </p>
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8K Video / 8-14K Photo</span>
                </div>
                <span>Meta Quest 2</span>
              </div>
            </div>

            {/* MVP 2 */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">02 / Sugarloaf Mountain</span>
                <h3>The Forest Canopy</h3>
                <p>
                  High-density visual capture focusing on intricate pine clusters and dynamic natural lighting. Designed with layered wind audio loops to cultivate mindfulness and a deep sense of calm.
                </p>
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8-14K Stills & Audio</span>
                </div>
                <span>Spatial Sound</span>
              </div>
            </div>

            {/* MVP 3 */}
            <div className="card-mvp">
              <div className="mvp-body">
                <span className="mvp-tag">03 / Local Waterways</span>
                <h3>Cascading Motion</h3>
                <p>
                  A study in environmental synchronization, fine-tuning hardware tracking against fast-moving water rapids to ensure the virtual experience feels completely natural and fluid.
                </p>
              </div>
              <div className="mvp-footer">
                <div className="footer-icon-group">
                  <Video size={14} />
                  <span>8-14K Looping Asset</span>
                </div>
                <span>Fluid Dynamic Sync</span>
              </div>
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
          {/* Phase 1 */}
          <div className="timeline-item active">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 01 / Current</span>
            <h4>Proof of Concept & MVP Construction</h4>
            <p>
              Building initial 3-to-6 minute prototypes using local assets. These serve as our core master keys for demonstrations, showcasing the project academically at Northern Michigan University to attract initial funding.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 02</span>
            <h4>Academic Validation & Research</h4>
            <p>
              Collaborating with the NMU Psychology department to study the emotional and cognitive impacts of "virtual nature immersion." Launching local pilot programs using headsets in eldercare facilities and mobility-limited clinics.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-meta">Phase 03</span>
            <h4>Sponsorships & Corporate Alliances</h4>
            <p>
              Leveraging our pilot results to offer high-value case studies to camera manufacturers and global healthcare groups—showing how hardware can tell powerful, life-changing human stories.
            </p>
          </div>

          {/* Phase 4 */}
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
                  <button type="submit" className="btn-submit">Send Message</button>
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

    </div>
  );
}