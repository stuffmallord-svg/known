import Link from "next/link";
import styles from "./page.module.css";

const fragments = [
  ["MUSIC", "01"],
  ["PLACES", "02"],
  ["PEOPLE", "03"],
  ["WORK", "04"],
  ["MEMORIES", "05"],
  ["THOUGHTS", "06"],
];

const signals = [
  { label: "MUSIC", x: "9%", y: "18%" },
  { label: "PLACES", x: "76%", y: "14%" },
  { label: "PEOPLE", x: "14%", y: "68%" },
  { label: "WORK", x: "78%", y: "70%" },
  { label: "MEMORIES", x: "35%", y: "11%" },
  { label: "THOUGHTS", x: "59%", y: "82%" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          KNOWN
        </Link>

        <div className={styles.navCenter}>
          <span>PERSONAL FIELD</span>
          <span>2026</span>
        </div>

        <Link href="/app" className={styles.navAction}>
          ENTER APP
          <span>↗</span>
        </Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>A PERSONAL MEMORY SYSTEM</span>

          <h1>
            You are
            <span>made of more.</span>
          </h1>

          <p>
            The music you save. The places you return to. The things you build.
            The people you remember. KNOWN keeps the pieces that matter and
            starts seeing the connections between them.
          </p>

          <div className={styles.heroActions}>
            <Link href="/app" className={styles.primaryButton}>
              MEET KNOWN
              <span>→</span>
            </Link>

            <a href="#idea" className={styles.textButton}>
              SEE THE IDEA
            </a>
          </div>

          <div className={styles.heroMeta}>
            <span>LIVE MEMORY SYSTEM</span>
            <span>BUILT FOR ONE PERSON</span>
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualGrid} />

          <div className={`${styles.visualAxis} ${styles.axisX}`} />
          <div className={`${styles.visualAxis} ${styles.axisY}`} />

          <div className={`${styles.orbit} ${styles.orbit1}`} />
          <div className={`${styles.orbit} ${styles.orbit2}`} />
          <div className={`${styles.orbit} ${styles.orbit3}`} />

          <div className={styles.core}>
            <div className={styles.coreInner} />
            <span />
            <strong>KNOWN</strong>
          </div>

          {signals.map((signal) => (
            <span
              key={signal.label}
              className={styles.signal}
              style={{ left: signal.x, top: signal.y }}
            >
              {signal.label}
            </span>
          ))}

          <span className={`${styles.cornerLabel} ${styles.cornerTop}`}>
            FIELD / 01
          </span>

          <span className={`${styles.cornerLabel} ${styles.cornerBottom}`}>
            EVERYTHING CONNECTS
          </span>
        </div>
      </section>

      <section className={styles.marquee} aria-hidden="true">
        <div>YOUR LIFE LEAVES SIGNALS</div>
        <div>YOUR LIFE LEAVES SIGNALS</div>
        <div>YOUR LIFE LEAVES SIGNALS</div>
      </section>

      <section id="idea" className={styles.section}>
        <div className={styles.sectionTop}>
          <span>01 / THE WHOLE PICTURE</span>
          <span>NOT ONE THING</span>
        </div>

        <div className={styles.intro}>
          <h2>
            A person is
            <span>never just one thing.</span>
          </h2>

          <p>
            Your world is already full of information about you. It just lives
            in different places.
          </p>
        </div>

        <div className={styles.fragmentGrid}>
          {fragments.map(([title, number]) => (
            <div key={title} className={styles.fragment}>
              <span>{number}</span>
              <strong>{title}</strong>
              <div className={styles.fragmentLine} />
              <small>
                {title === "MUSIC" && "What you keep playing."}
                {title === "PLACES" && "Where you keep returning."}
                {title === "PEOPLE" && "Who keeps mattering."}
                {title === "WORK" && "What you keep making."}
                {title === "MEMORIES" && "What stayed with you."}
                {title === "THOUGHTS" && "What keeps coming back."}
              </small>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.bridge}>
        <div className={styles.bridgeVisual} aria-hidden="true">
          <div className={styles.bridgeGrid} />
          <div className={`${styles.bridgeLine} ${styles.bridgeLineA}`} />
          <div className={`${styles.bridgeLine} ${styles.bridgeLineB}`} />
          <div className={`${styles.bridgeLine} ${styles.bridgeLineC}`} />
          <div className={styles.bridgeCore}>
            <span />
            <strong>YOU</strong>
          </div>
        </div>

        <div className={styles.bridgeCopy}>
          <span className={styles.eyebrow}>THE CONNECTION</span>

          <h2>
            None of it means
            <span>much alone.</span>
          </h2>

          <p>
            Together, those fragments start to form a picture. KNOWN pays
            attention to the whole thing instead of treating every moment like
            it happened in isolation.
          </p>

          <div className={styles.bridgeStatement}>
            <span>TRACES</span>
            <strong>→</strong>
            <span>CONNECTIONS</span>
            <strong>→</strong>
            <span>UNDERSTANDING</span>
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <div className={styles.sectionTop}>
          <span>02 / BEING REMEMBERED</span>
          <span>THE FEELING</span>
        </div>

        <div className={styles.experienceIntro}>
          <h2>
            It gets back to you
            <span>at the right moment.</span>
          </h2>

          <p>
            You mention something. Time passes. Life moves on. Then something
            in the present makes the old thing relevant again.
          </p>
        </div>

        <div className={styles.mockup}>
          <div className={styles.mockupHead}>
            <div>
              <span>KNOWN / ACTIVE</span>
              <strong>Someone who knows your world.</strong>
            </div>

            <span className={styles.online}>ONLINE</span>
          </div>

          <div className={styles.mockupBody}>
            <div className={styles.mockupField} aria-hidden="true">
              <div className={styles.mockupGrid} />
              <div className={styles.mockupCircleA} />
              <div className={styles.mockupCircleB} />
              <div className={styles.mockupDot} />
            </div>

            <div className={styles.mockupMessage}>
              <span className={styles.eyebrow}>I NOTICED</span>

              <h3>
                Something keeps
                <span>returning.</span>
              </h3>

              <p>
                Dark rooms. Silver surfaces. Music. Movement. You keep finding
                the same feeling in different parts of your world.
              </p>

              <Link href="/app" className={styles.mockupLink}>
                TALK TO KNOWN
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className={styles.mockupFoot}>
            <span>14 CONNECTED SIGNALS</span>
            <span>03 ACTIVE THREADS</span>
            <span>01 NEW ECHO</span>
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalGrid} />
        <div className={styles.finalOrb} />

        <div className={styles.finalContent}>
          <span className={styles.eyebrow}>KNOWN</span>

          <h2>
            Someone who
            <span>knows your world.</span>
          </h2>

          <p>
            A place for the things you notice, the things you remember and the
            things that keep coming back.
          </p>

          <Link href="/app" className={styles.finalButton}>
            ENTER KNOWN
            <span>↗</span>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>KNOWN / PERSONAL FIELD</span>
        <span>SOMEONE WHO KNOWS YOUR WORLD.</span>
        <span>2026</span>
      </footer>
    </main>
  );
}
