import styles from "./local-news.module.css";

const districts = ["Bhubaneswar", "Cuttack", "Puri", "Mayurbhanj", "Balasore", "Ganjam", "Khordha", "Sambalpur"];

const stories = [
  { tag: "Bhubaneswar", time: "18 min ago", title: "City civic updates: roads, drainage and traffic changes you should know today.", source: "Local Desk", hot: true },
  { tag: "Jobs", time: "42 min ago", title: "New Odisha recruitment updates: vacancies, eligibility and important dates in one place.", source: "Jobs Desk", hot: true },
  { tag: "Weather", time: "1 hr ago", title: "Weather watch: latest rain and district-level alert information for Odisha.", source: "Weather Desk", hot: false },
  { tag: "Education", time: "2 hrs ago", title: "Schools and colleges: latest notices, results and admission updates.", source: "Education Desk", hot: false },
  { tag: "Cuttack", time: "2 hrs ago", title: "Cuttack city update: public services and local development news.", source: "City Desk", hot: false },
  { tag: "Puri", time: "3 hrs ago", title: "Puri update: tourism, temple-area information and local events.", source: "Puri Desk", hot: false },
];

const quickLinks = [
  ["🚨", "Breaking"],
  ["💼", "Jobs"],
  ["🎓", "Education"],
  ["🌧️", "Weather"],
  ["🚦", "Traffic"],
  ["🏛️", "Government"],
  ["🏪", "Local Business"],
  ["🎉", "Events"],
];

export default function LocalNewsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <div className={styles.container}>
          <span>🔴 LIVE LOCAL</span>
          <span>Odisha • Updated throughout the day</span>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brandRow}>
            <div>
              <div className={styles.brand}>Local<span>Odisha</span></div>
              <p>Your local internet — news, jobs, alerts & things happening near you.</p>
            </div>
            <button className={styles.location}>📍 Bhubaneswar ▾</button>
          </div>

          <nav className={styles.nav} aria-label="Local news categories">
            {quickLinks.map(([icon, label]) => (
              <a href={`#${label.toLowerCase().replaceAll(" ", "-")}`} key={label}>
                <span>{icon}</span>{label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>TODAY IN YOUR AREA</div>
              <h1>Everything happening <span>near you.</span></h1>
              <p className={styles.heroText}>One clean feed for local news, government notices, jobs, weather, traffic, events and useful everyday updates.</p>
              <div className={styles.search}>
                <span>⌕</span>
                <input placeholder="Search your city, district, topic or job..." aria-label="Search local news" />
                <button>Search</button>
              </div>
            </div>
            <div className={styles.alertCard}>
              <div className={styles.alertIcon}>⚡</div>
              <div>
                <strong>Local Alert</strong>
                <p>Important updates for your selected area will appear here first.</p>
              </div>
              <span className={styles.liveDot}>● LIVE</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>YOUR FEED</span>
              <h2>Latest local updates</h2>
            </div>
            <a href="#all">View all →</a>
          </div>

          <div className={styles.layout}>
            <div className={styles.mainFeed}>
              {stories.map((story) => (
                <article className={styles.story} key={story.title}>
                  <div className={styles.storyImage}>{story.tag === "Weather" ? "🌧️" : story.tag === "Jobs" ? "💼" : "📰"}</div>
                  <div className={styles.storyBody}>
                    <div className={styles.meta}>
                      <span>{story.tag}</span>
                      <span>•</span>
                      <span>{story.time}</span>
                      {story.hot && <b>HOT</b>}
                    </div>
                    <h3>{story.title}</h3>
                    <p>{story.source} · Verified/official-source summary</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.panel}>
                <div className={styles.panelTitle}>📍 Explore Odisha</div>
                <p>Select a place to see local updates.</p>
                <div className={styles.districts}>
                  {districts.map((district) => <button key={district}>{district}</button>)}
                </div>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelTitle}>🔥 Trending locally</div>
                <ol>
                  <li><span>01</span> Government & public services</li>
                  <li><span>02</span> Jobs & recruitment</li>
                  <li><span>03</span> Weather & alerts</li>
                  <li><span>04</span> Education updates</li>
                </ol>
              </div>
            </aside>
          </div>

          <section className={styles.value}>
            <div>
              <span className={styles.kicker}>NOT JUST NEWS</span>
              <h2>Useful information for everyday life.</h2>
            </div>
            <div className={styles.valueGrid}>
              <div><span>🚦</span><strong>Traffic & roads</strong><p>Know what changed before you travel.</p></div>
              <div><span>💼</span><strong>Jobs & exams</strong><p>Find important openings without noise.</p></div>
              <div><span>🏛️</span><strong>Government</strong><p>Turn official notices into simple summaries.</p></div>
              <div><span>🎉</span><strong>What's on</strong><p>Discover events happening around you.</p></div>
            </div>
          </section>

          <section className={styles.trust}>
            <strong>Our editorial promise</strong>
            <p>We do not copy newspaper articles. Stories should be independently summarized, clearly sourced and labelled when information is developing or unverified.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
