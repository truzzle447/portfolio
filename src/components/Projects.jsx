import "./Projects.css";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <p className="section-title">Projects</p>
      <div className="projects-grid">
        <article className="project-card">
          <div className="project-header">
            <div>
              <h3>DESQ</h3>
              <p className="project-subtitle">Academic Task & Focus Manager</p>
            </div>
            <div className="project-tags">
              <span className="tag tag-accent">Ready</span>
              <span className="tag tag-calm">Deployment Pending</span>
            </div>
          </div>
          <p className="project-problem">
            Academic work scattered across tabs, tools, and deadlines creates
            cognitive overload.
          </p>
          <ul className="project-list">
            <li>Centralized task dashboard</li>
            <li>Color-coded urgency (Today / Upcoming / Completed)</li>
            <li>Built for cognitive relief and real daily use</li>
            <li>Ready for deployment, paused by budget constraints</li>
          </ul>
          <a className="project-link" href="https://github.com/truzzle447/desq">
            GitHub
          </a>
        </article>

        <article className="project-card">
          <div className="project-header">
            <div>
              <h3>Booking System + Portfolio</h3>
              <p className="project-subtitle">Beauty Business</p>
            </div>
            <div className="project-tags">
              <span className="tag tag-client">Client</span>
              <span className="tag tag-progress">In Progress</span>
            </div>
          </div>
          <p className="project-problem">
            Manual bookings and no clear online presence slowed a small beauty
            business.
          </p>
          <ul className="project-list">
            <li>Booking system for appointments</li>
            <li>Portfolio-style site for services</li>
            <li>Built around real client constraints and delivery</li>
          </ul>
          <a
            className="project-link"
            href="https://github.com/truzzle447/beauty-booking"
          >
            GitHub
          </a>
        </article>

        <article className="project-card">
          <div className="project-header">
            <div>
              <h3>SumFun</h3>
              <p className="project-subtitle">Math Tutoring Platform</p>
            </div>
            <div className="project-tags">
              <span className="tag tag-progress">In Progress</span>
            </div>
          </div>
          <p className="project-problem">
            Offline tutoring does not scale or manage students efficiently.
          </p>
          <ul className="project-list">
            <li>Weekend math tutoring business</li>
            <li>Actively digitizing into a platform</li>
          </ul>
          <a className="project-link" href="https://github.com/truzzle447/sumfun">
            GitHub
          </a>
        </article>
      </div>
    </section>
  );
}
