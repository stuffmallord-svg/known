"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MOMENTS = [
  {
    label: "YOU / LAST TUESDAY",
    text: "I've been listening to the same kind of music all week.",
    known:
      "You have been circling around the same feeling for a while. The references change, but the atmosphere doesn't.",
    meta: "MUSIC / MOOD / 21 DAYS",
  },
  {
    label: "YOU / 18 DAYS AGO",
    text: "I want this project to feel less polished.",
    known:
      "You keep choosing things that feel a little unfinished. It shows up in what you make, save and come back to.",
    meta: "VISUALS / TASTE / WORK",
  },
  {
    label: "YOU / TODAY",
    text: "Why do I keep coming back to these things?",
    known:
      "Because they keep appearing in different parts of your life. You just don't usually see them at the same time.",
    meta: "MUSIC / PLACES / IDENTITY",
  },
];

const LIFE_SIGNALS = [
  ["MUSIC", "what you replay"],
  ["PLACES", "where you return"],
  ["PEOPLE", "who stays with you"],
  ["THINGS", "what you choose"],
  ["WORK", "what you make"],
  ["ROUTINES", "what you repeat"],
  ["MEMORIES", "what remains"],
  ["THOUGHTS", "what keeps moving"],
];

export default function HomePage() {
  const [momentIndex, setMomentIndex] = useState(0);
  const [momentVisible, setMomentVisible] = useState(true);

  const nextMoment = () => {
    setMomentVisible(false);

    window.setTimeout(() => {
      setMomentIndex((current) => (current + 1) % MOMENTS.length);
      setMomentVisible(true);
    }, 180);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMomentVisible(false);

      window.setTimeout(() => {
        setMomentIndex((current) => (current + 1) % MOMENTS.length);
        setMomentVisible(true);
      }, 180);
    }, 7600);

    return () => window.clearInterval(interval);
  }, []);

  const moment = MOMENTS[momentIndex];

  return (
    <>
      <main className="known-editorial">
        <div className="site-grain" />

        <header className="editorial-nav">
          <Link href="/" className="editorial-logo">
            <span className="logo-symbol">
              <i />
              <i />
            </span>

            <span>KNOWN</span>
          </Link>

          <div className="editorial-nav-mid">
            <span className="status-light" />
            <span>PERSONAL AI COMPANION</span>
          </div>

          <Link href="/app" className="editorial-enter">
            OPEN APP <span>↗</span>
          </Link>
        </header>

        <section className="editorial-hero">
          <div className="hero-copy">
            <div className="hero-label">
              <span />
              BUILT AROUND YOUR REAL LIFE
            </div>

            <h1>
              You are made
              <em>of more.</em>
            </h1>

            <p className="hero-description">
              The songs you replay. The places you return to. The people you
              remember. The things you make. The thoughts you keep having.
            </p>

            <p className="hero-description secondary">
              KNOWN pays attention to the whole picture.
            </p>

            <div className="hero-actions">
              <Link href="/app" className="hero-button">
                <span>Meet KNOWN</span>
                <span>↗</span>
              </Link>

              <a href="#life" className="hero-scroll">
                <span>SCROLL TO EXPLORE</span>
                <i>↓</i>
              </a>
            </div>
          </div>

          <div className="hero-composition">
            <div className="composition-grid" />

            <div className="composition-line line-left" />
            <div className="composition-line line-right" />
            <div className="composition-line line-bottom" />

            <div className="composition-object">
              <div className="object-shadow" />
              <div className="object-layer layer-back" />
              <div className="object-layer layer-middle" />
              <div className="object-layer layer-front">
                <div className="object-notch" />
                <span className="object-word">YOU</span>
                <small>ALL OF IT</small>
              </div>

              <div className="object-ring ring-a" />
              <div className="object-ring ring-b" />
              <div className="object-ring ring-c" />

              <div className="object-signal signal-top">
                <span className="signal-index">01</span>
                <div>
                  <strong>MUSIC</strong>
                  <small>what you replay</small>
                </div>
              </div>

              <div className="object-signal signal-right">
                <span className="signal-index">02</span>
                <div>
                  <strong>PLACES</strong>
                  <small>where you return</small>
                </div>
              </div>

              <div className="object-signal signal-bottom">
                <span className="signal-index">03</span>
                <div>
                  <strong>MEMORY</strong>
                  <small>what remains</small>
                </div>
              </div>

              <div className="object-signal signal-left">
                <span className="signal-index">04</span>
                <div>
                  <strong>WORK</strong>
                  <small>what you make</small>
                </div>
              </div>
            </div>

            <div className="floating-caption caption-a">YOUR WORLD</div>
            <div className="floating-caption caption-b">COLLECTING CONTEXT</div>
            <div className="floating-coordinate">41°43′N / 44°47′E</div>
          </div>
        </section>

        <section className="signal-marquee">
          <div className="marquee-intro">A PERSON IS FORMED BY</div>

          <div className="marquee-track">
            {LIFE_SIGNALS.map(([label, detail], index) => (
              <div className="marquee-item" key={label}>
                <span className="marquee-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="life-section" id="life">
          <div className="section-heading">
            <span className="section-code">01 / THE HUMAN PART</span>

            <h2>
              Life doesn't arrive
              <span>in neat categories.</span>
            </h2>

            <p>
              Real life is messy. A song reminds you of a person. A place
              changes the way you work. A random image becomes part of your
              taste six months later.
            </p>
          </div>

          <div className="life-layout">
            <div className="life-quote">
              <div className="quote-line" />

              <p>
                “The smallest things can become
                <span>part of who you are.</span>”
              </p>

              <small>KNOWN / OBSERVING THE WHOLE</small>
            </div>

            <div className="life-rows">
              {LIFE_SIGNALS.map(([label, detail], index) => (
                <div className="life-row" key={label}>
                  <span className="life-row-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{label}</strong>

                  <span className="life-row-detail">{detail}</span>

                  <span className="life-row-arrow">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="connect-section">
          <div className="connect-visual">
            <div className="connect-grid" />

            <div className="connect-vertical" />
            <div className="connect-horizontal" />

            <div className="connect-word connect-word-a">MUSIC</div>
            <div className="connect-word connect-word-b">VISUALS</div>
            <div className="connect-word connect-word-c">PLACES</div>
            <div className="connect-word connect-word-d">WORK</div>

            <div className="connect-pivot">
              <span />
              <strong>YOU</strong>
              <small>THE CONNECTION</small>
            </div>

            <div className="connect-path path-one" />
            <div className="connect-path path-two" />
            <div className="connect-path path-three" />
            <div className="connect-path path-four" />

            <div className="connect-caption">
              DIFFERENT PARTS
              <br />
              SAME DIRECTION
            </div>
          </div>

          <div className="connect-copy">
            <span className="section-code">02 / WHEN THINGS CONNECT</span>

            <h2>
              None of it
              <span>exists alone.</span>
            </h2>

            <p>
              One thing on its own tells you almost nothing. But when the same
              feeling keeps appearing across different parts of your life,
              something starts to emerge.
            </p>

            <p className="quiet-copy">
              KNOWN is built for that moment.
            </p>
          </div>
        </section>

        <section className="statement-section">
          <span className="section-code">03 / THE IDEA</span>

          <div>
            <p className="statement-main">
              <span>You leave traces</span> everywhere.
            </p>

            <p className="statement-secondary">
              KNOWN gives them somewhere to meet.
            </p>
          </div>
        </section>

        <section className="moment-section">
          <div className="moment-heading">
            <div>
              <span className="section-code">04 / A MOMENT WITH KNOWN</span>

              <h2>
                This is what
                <span>being remembered feels like.</span>
              </h2>
            </div>

            <button type="button" onClick={nextMoment} className="moment-next">
              ANOTHER MOMENT
              <span>↻</span>
            </button>
          </div>

          <div className="moment-interface">
            <div className="moment-interface-top">
              <span>
                <i />
                KNOWN / CONVERSATION
              </span>

              <span>MEMORY ACTIVE</span>
            </div>

            <div
              className={`moment-body ${
                momentVisible ? "is-visible" : "is-hidden"
              }`}
            >
              <div className="moment-meta">{moment.label}</div>

              <div className="moment-message-row">
                <div className="moment-person">YOU</div>

                <div className="moment-message">
                  <p>{moment.text}</p>
                </div>
              </div>

              <div className="moment-bridge">
                <div className="bridge-rule" />
                <span>KNOWN REMEMBERED</span>
              </div>

              <div className="moment-message-row">
                <div className="moment-person known-mark">
                  <i />
                  <i />
                </div>

                <div className="moment-message known-response">
                  <span>KNOWN</span>

                  <p>{moment.known}</p>

                  <small>{moment.meta}</small>
                </div>
              </div>
            </div>

            <div className="moment-interface-bottom">
              <span>NOT A PROFILE / NOT A TEST</span>
              <span>
                {String(momentIndex + 1).padStart(2, "0")} / 03
              </span>
            </div>
          </div>
        </section>

        <section className="app-section">
          <div className="app-copy">
            <span className="section-code">05 / THE APP</span>

            <h2>
              Your world,
              <span>kept together.</span>
            </h2>

            <p>
              Start with a conversation. Over time, KNOWN remembers what
              matters, notices what repeats and brings old things back when
              they become relevant.
            </p>

            <Link href="/app" className="app-link">
              ENTER KNOWN
              <span>↗</span>
            </Link>
          </div>

          <div className="app-preview">
            <div className="preview-top">
              <div>
                <span className="logo-symbol small">
                  <i />
                  <i />
                </span>
                KNOWN
              </div>

              <span>NOW / TODAY</span>
            </div>

            <div className="preview-layout">
              <aside className="preview-nav">
                <span className="active" />
                <span />
                <span />
                <span />
                <span />
              </aside>

              <div className="preview-main">
                <div className="preview-header">
                  <span>YOU ARE HERE</span>
                  <span>24 SEP / 2026</span>
                </div>

                <div className="preview-title">
                  <small>KNOWN</small>

                  <h3>
                    A lot is changing.
                    <br />
                    <em>Something is taking shape.</em>
                  </h3>
                </div>

                <div className="preview-observation">
                  <div>
                    <span className="status-light" />
                    I NOTICED
                  </div>

                  <p>
                    You keep returning to things that feel quiet, dark and
                    slightly unfinished.
                  </p>
                </div>

                <div className="preview-footer">
                  <div>
                    <small>MEMORY</small>
                    <strong>23</strong>
                  </div>

                  <div>
                    <small>THREADS</small>
                    <strong>08</strong>
                  </div>

                  <div>
                    <small>ECHOES</small>
                    <strong>14</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="final-object">
            <div className="final-ring ring-one" />
            <div className="final-ring ring-two" />
            <div className="final-ring ring-three" />

            <div className="final-core">
              <small>START HERE</small>
              <strong>KNOWN</strong>
              <span>AND LET IT GET TO KNOW YOU</span>
            </div>
          </div>

          <div className="final-copy">
            <span className="section-code">06 / BEGIN</span>

            <h2>
              You don't have to
              <span>explain everything.</span>
            </h2>

            <p>
              Just start living. Start talking.
              <br />
              The rest becomes context.
            </p>

            <Link href="/app" className="final-button">
              <span>Start with KNOWN</span>
              <span>↗</span>
            </Link>
          </div>
        </section>

        <footer className="editorial-footer">
          <div className="editorial-logo">
            <span className="logo-symbol">
              <i />
              <i />
            </span>

            <span>KNOWN</span>
          </div>

          <span>Someone who knows your world.</span>

          <span className="footer-code">TBILISI / 2026</span>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          --known-editorial-bg: #050506;
          --known-editorial-surface: #0b0b0d;
          --known-editorial-text: #f3f1f3;
          --known-editorial-soft: #c9c3ca;
          --known-editorial-muted: #969097;
          --known-editorial-dim: #655f67;
          --known-editorial-line: rgba(255, 255, 255, 0.085);
          --known-editorial-line-strong: rgba(255, 255, 255, 0.15);

          /* MILKY LILAC */
          --known-editorial-accent: #d8c5e2;
          --known-editorial-accent-soft: rgba(231, 222, 239, 0.1);

          /* VERY SUBTLE SECONDARY TONES */
          --known-editorial-accent-gray: #bda9c8;
          --known-editorial-accent-warm: #e9e1e9;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--known-editorial-bg);
        }

        .known-editorial {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 76% 9%,
              rgba(231, 222, 239, 0.04),
              transparent 23%
            ),
            radial-gradient(
              circle at 14% 28%,
              rgba(255, 255, 255, 0.022),
              transparent 24%
            ),
            var(--known-editorial-bg);
          color: var(--known-editorial-text);
          font-family:
            "Inter Tight",
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          position: relative;
        }

        .site-grain {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 90;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          mix-blend-mode: screen;
        }

        .editorial-nav,
        .editorial-hero,
        .signal-marquee,
        .life-section,
        .connect-section,
        .statement-section,
        .moment-section,
        .app-section,
        .final-section,
        .editorial-footer {
          width: min(1440px, calc(100% - 64px));
          margin: 0 auto;
        }

        .editorial-nav {
          height: 84px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          border-bottom: 1px solid var(--known-editorial-line);
        }

        .editorial-logo {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: inherit;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .logo-symbol {
          width: 25px;
          height: 25px;
          padding: 4px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-sizing: border-box;
        }

        .logo-symbol i {
          display: block;
          background: #f1eff1;
        }

        .logo-symbol i:last-child {
          opacity: 0.3;
        }

        .logo-symbol.small {
          width: 17px;
          height: 17px;
          padding: 3px;
          gap: 2px;
        }

        .editorial-nav-mid,
        .editorial-enter,
        .hero-label,
        .section-code,
        .marquee-intro,
        .marquee-number,
        .object-signal,
        .floating-caption,
        .floating-coordinate,
        .life-row-number,
        .connect-caption,
        .moment-interface,
        .app-preview,
        .preview-header,
        .preview-observation,
        .final-eyebrow,
        .footer-code {
          font-family: "IBM Plex Mono", monospace;
        }

        .editorial-nav-mid {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--known-editorial-dim);
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .status-light {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          flex: 0 0 auto;
          background: var(--known-editorial-accent);
          box-shadow: 0 0 16px rgba(231, 222, 239, 0.26);
        }

        .editorial-enter {
          justify-self: end;
          color: var(--known-editorial-muted);
          text-decoration: none;
          font-size: 9px;
          letter-spacing: 0.12em;
          transition:
            color 180ms ease,
            transform 180ms ease;
        }

        .editorial-enter span {
          margin-left: 5px;
        }

        .editorial-enter:hover {
          color: #fff;
          transform: translateX(2px);
        }

        .editorial-hero {
          min-height: 800px;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(560px, 1.1fr);
          gap: 35px;
          align-items: center;
          padding: 64px 0 86px;
        }

        .hero-copy {
          max-width: 720px;
          position: relative;
          z-index: 3;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--known-editorial-muted);
          font-size: 9px;
          letter-spacing: 0.11em;
        }

        .hero-label > span {
          width: 28px;
          height: 1px;
          background: var(--known-editorial-accent);
        }

        .hero-copy h1 {
          margin: 31px 0 0;
          font-size: clamp(76px, 8vw, 138px);
          line-height: 0.84;
          letter-spacing: -0.075em;
          font-weight: 600;
        }

        .hero-copy h1 em {
          display: block;
          font-style: normal;
          color: #7c747d;
        }

        .hero-description {
          max-width: 590px;
          margin: 42px 0 0;
          color: var(--known-editorial-soft);
          font-size: 18px;
          line-height: 1.62;
          letter-spacing: -0.018em;
        }

        .hero-description.secondary {
          margin-top: 10px;
          color: var(--known-editorial-dim);
        }

        .hero-actions {
          margin-top: 37px;
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .hero-button,
        .final-button {
          min-height: 56px;
          padding: 0 19px 0 23px;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          color: #18151a;
          background: var(--known-editorial-accent);
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition:
            transform 180ms ease,
            background 180ms ease;
        }

        .hero-button:hover,
        .final-button:hover {
          transform: translateY(-2px);
          background: #f3edf5;
        }

        .hero-scroll {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--known-editorial-muted);
          font-family: "IBM Plex Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.11em;
          transition: color 180ms ease;
        }

        .hero-scroll i {
          font-style: normal;
          font-size: 13px;
        }

        .hero-scroll:hover {
          color: #fff;
        }

        .hero-composition {
          min-height: 650px;
          position: relative;
        }

        .composition-grid {
          position: absolute;
          inset: 4% 2% 3% 2%;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 38px 38px;
          mask-image: radial-gradient(
            circle at center,
            black 5%,
            transparent 75%
          );
          opacity: 0.42;
        }

        .composition-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
        }

        .line-left {
          width: 1px;
          top: 8%;
          bottom: 12%;
          left: 17%;
        }

        .line-right {
          width: 1px;
          top: 13%;
          bottom: 5%;
          right: 13%;
        }

        .line-bottom {
          left: 7%;
          right: 8%;
          bottom: 16%;
          height: 1px;
        }

        .composition-object {
          width: 510px;
          height: 590px;
          position: absolute;
          left: 51%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-7deg);
        }

        .object-shadow {
          position: absolute;
          width: 275px;
          height: 410px;
          left: 120px;
          top: 95px;
          background: rgba(0, 0, 0, 0.45);
          filter: blur(45px);
          transform: rotate(10deg);
        }

        .object-layer {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.008)
            ),
            #0a0a0c;
        }

        .layer-back {
          width: 250px;
          height: 430px;
          left: 130px;
          top: 88px;
          transform: rotate(18deg);
          border-color: rgba(231, 222, 239, 0.13);
        }

        .layer-middle {
          width: 280px;
          height: 450px;
          left: 140px;
          top: 70px;
          transform: rotate(6deg);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .layer-front {
          width: 285px;
          height: 455px;
          left: 116px;
          top: 73px;
          transform: rotate(-8deg);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(
              circle at 50% 32%,
              rgba(231, 222, 239, 0.11),
              transparent 27%
            ),
            linear-gradient(
              160deg,
              rgba(255, 255, 255, 0.05),
              rgba(255, 255, 255, 0.008)
            ),
            #09090b;
          box-shadow: 40px 50px 100px rgba(0, 0, 0, 0.4);
        }

        .layer-front::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(231, 222, 239, 0.18);
        }

        .layer-front::after {
          content: "";
          position: absolute;
          width: 1px;
          top: 20px;
          bottom: 20px;
          left: 50%;
          background: rgba(255, 255, 255, 0.08);
        }

        .object-notch {
          position: absolute;
          width: 85px;
          height: 13px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background: #050506;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top: 0;
        }

        .object-word {
          position: relative;
          z-index: 2;
          font-size: 38px;
          font-weight: 600;
          letter-spacing: -0.05em;
        }

        .layer-front small {
          position: relative;
          z-index: 2;
          margin-top: 10px;
          color: var(--known-editorial-dim);
          font-family: "IBM Plex Mono", monospace;
          font-size: 7px;
          letter-spacing: 0.17em;
        }

        .object-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(231, 222, 239, 0.2);
        }

        .ring-a {
          width: 420px;
          height: 210px;
          left: 27px;
          top: 175px;
          transform: rotate(24deg);
        }

        .ring-b {
          width: 360px;
          height: 155px;
          left: 72px;
          top: 240px;
          transform: rotate(-22deg);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .ring-c {
          width: 250px;
          height: 520px;
          left: 125px;
          top: 35px;
          transform: rotate(34deg);
          border-color: rgba(231, 222, 239, 0.11);
        }

        .object-signal {
          position: absolute;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 9px 0;
          color: var(--known-editorial-muted);
          border-top: 1px solid var(--known-editorial-line);
          width: 150px;
          transform: rotate(7deg);
        }

        .object-signal strong {
          display: block;
          color: #d8d2d9;
          font-family:
            "Inter Tight",
            Inter,
            sans-serif;
          font-size: 10px;
          letter-spacing: 0.03em;
        }

        .object-signal small {
          display: block;
          margin-top: 3px;
          color: var(--known-editorial-dim);
          font-family:
            "Inter Tight",
            Inter,
            sans-serif;
          font-size: 9px;
          letter-spacing: 0;
        }

        .signal-index {
          color: var(--known-editorial-accent-gray);
          font-size: 8px;
        }

        .signal-top {
          top: 35px;
          right: 0;
        }

        .signal-right {
          right: -13px;
          top: 286px;
        }

        .signal-bottom {
          left: 0;
          bottom: 33px;
        }

        .signal-left {
          left: -16px;
          top: 165px;
        }

        .floating-caption {
          position: absolute;
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .caption-a {
          top: 8%;
          left: 2%;
        }

        .caption-b {
          right: 1%;
          bottom: 8%;
        }

        .floating-coordinate {
          position: absolute;
          right: 3%;
          top: 50%;
          color: rgba(255, 255, 255, 0.17);
          font-size: 7px;
          letter-spacing: 0.13em;
          transform: rotate(90deg) translateX(50%);
          transform-origin: right center;
        }

        .signal-marquee {
          border-top: 1px solid var(--known-editorial-line);
          border-bottom: 1px solid var(--known-editorial-line);
          min-height: 104px;
          display: grid;
          grid-template-columns: 220px 1fr;
          align-items: center;
        }

        .marquee-intro {
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.11em;
        }

        .marquee-track {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
        }

        .marquee-item {
          min-height: 104px;
          padding: 0 16px;
          border-left: 1px solid var(--known-editorial-line);
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .marquee-number {
          color: var(--known-editorial-dim);
          font-size: 7px;
        }

        .marquee-item strong {
          display: block;
          font-size: 10px;
          letter-spacing: 0.07em;
        }

        .marquee-item small {
          display: block;
          margin-top: 4px;
          color: var(--known-editorial-dim);
          font-size: 8px;
          white-space: nowrap;
        }

        .life-section {
          padding: 170px 0 180px;
          border-bottom: 1px solid var(--known-editorial-line);
        }

        .section-code {
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .section-heading {
          max-width: 860px;
        }

        .section-heading h2,
        .connect-copy h2,
        .moment-heading h2,
        .app-copy h2,
        .final-copy h2 {
          margin: 24px 0 0;
          font-size: clamp(56px, 5.8vw, 94px);
          line-height: 0.9;
          letter-spacing: -0.062em;
          font-weight: 600;
        }

        .section-heading h2 span,
        .connect-copy h2 span,
        .moment-heading h2 span,
        .app-copy h2 span,
        .final-copy h2 span {
          display: block;
          color: var(--known-editorial-dim);
        }

        .section-heading p {
          max-width: 640px;
          margin: 31px 0 0;
          color: var(--known-editorial-muted);
          font-size: 16px;
          line-height: 1.66;
        }

        .life-layout {
          margin-top: 90px;
          display: grid;
          grid-template-columns: 0.72fr 1.28fr;
          gap: 88px;
          align-items: start;
        }

        .life-quote {
          position: sticky;
          top: 40px;
          padding-top: 4px;
        }

        .quote-line {
          width: 36px;
          height: 1px;
          background: var(--known-editorial-accent);
          margin-bottom: 28px;
        }

        .life-quote p {
          max-width: 410px;
          margin: 0;
          font-size: clamp(28px, 3vw, 48px);
          line-height: 1.02;
          letter-spacing: -0.045em;
        }

        .life-quote p span {
          display: block;
          color: var(--known-editorial-accent);
        }

        .life-quote small {
          display: block;
          margin-top: 38px;
          color: var(--known-editorial-dim);
          font-family: "IBM Plex Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .life-rows {
          border-top: 1px solid var(--known-editorial-line);
        }

        .life-row {
          min-height: 96px;
          display: grid;
          grid-template-columns: 50px 0.65fr 1fr 32px;
          align-items: center;
          gap: 18px;
          border-bottom: 1px solid var(--known-editorial-line);
          transition:
            background 180ms ease,
            padding 180ms ease;
        }

        .life-row:hover {
          background: rgba(255, 255, 255, 0.018);
          padding-left: 10px;
        }

        .life-row-number {
          color: var(--known-editorial-dim);
          font-size: 8px;
        }

        .life-row strong {
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .life-row-detail {
          color: var(--known-editorial-muted);
          font-size: 12px;
        }

        .life-row-arrow {
          color: var(--known-editorial-accent);
          font-size: 14px;
        }

        .connect-section {
          min-height: 760px;
          padding: 0 0 180px;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(300px, 0.88fr);
          gap: 90px;
          align-items: center;
        }

        .connect-visual {
          height: 620px;
          border: 1px solid var(--known-editorial-line);
          position: relative;
          overflow: hidden;
          background: #09090b;
        }

        .connect-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 46px 46px;
          opacity: 0.35;
        }

        .connect-vertical {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .connect-horizontal {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .connect-word {
          position: absolute;
          color: var(--known-editorial-muted);
          font-family: "IBM Plex Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.11em;
        }

        .connect-word-a {
          left: 12%;
          top: 23%;
        }

        .connect-word-b {
          right: 12%;
          top: 19%;
        }

        .connect-word-c {
          left: 16%;
          bottom: 18%;
        }

        .connect-word-d {
          right: 14%;
          bottom: 21%;
        }

        .connect-pivot {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 1px solid rgba(231, 222, 239, 0.28);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background:
            radial-gradient(
              circle at center,
              rgba(231, 222, 239, 0.08),
              transparent 55%
            ),
            #0b0b0d;
          box-shadow: 0 0 90px rgba(0, 0, 0, 0.35);
        }

        .connect-pivot::before,
        .connect-pivot::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .connect-pivot::before {
          inset: 17px;
        }

        .connect-pivot::after {
          inset: -21px;
          border-color: rgba(231, 222, 239, 0.07);
        }

        .connect-pivot span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--known-editorial-accent);
          box-shadow: 0 0 18px rgba(231, 222, 239, 0.35);
        }

        .connect-pivot strong {
          margin-top: 11px;
          font-size: 19px;
          letter-spacing: 0.08em;
        }

        .connect-pivot small {
          margin-top: 5px;
          color: var(--known-editorial-dim);
          font-family: "IBM Plex Mono", monospace;
          font-size: 7px;
          letter-spacing: 0.12em;
        }

        .connect-path {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(231, 222, 239, 0),
            rgba(231, 222, 239, 0.42),
            rgba(231, 222, 239, 0)
          );
          transform-origin: left center;
        }

        .path-one {
          width: 240px;
          transform: rotate(-151deg);
        }

        .path-two {
          width: 220px;
          transform: rotate(-28deg);
        }

        .path-three {
          width: 240px;
          transform: rotate(151deg);
        }

        .path-four {
          width: 220px;
          transform: rotate(28deg);
        }

        .connect-caption {
          position: absolute;
          left: 18px;
          bottom: 18px;
          color: var(--known-editorial-dim);
          font-size: 7px;
          line-height: 1.6;
          letter-spacing: 0.11em;
        }

        .connect-copy {
          max-width: 520px;
        }

        .connect-copy p {
          max-width: 490px;
          margin: 31px 0 0;
          color: var(--known-editorial-muted);
          font-size: 16px;
          line-height: 1.65;
        }

        .connect-copy .quiet-copy {
          margin-top: 12px;
          color: var(--known-editorial-accent-gray);
        }

        .statement-section {
          padding: 100px 0 170px;
          border-top: 1px solid var(--known-editorial-line);
          display: grid;
          grid-template-columns: 0.34fr 1.66fr;
          gap: 60px;
        }

        .statement-main,
        .statement-secondary {
          margin: 0;
          font-size: clamp(42px, 4.6vw, 78px);
          line-height: 0.98;
          letter-spacing: -0.06em;
        }

        .statement-main span {
          color: var(--known-editorial-accent);
        }

        .statement-secondary {
          margin-top: 33px;
          color: var(--known-editorial-dim);
        }

        .moment-section {
          padding-bottom: 190px;
        }

        .moment-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 40px;
          margin-bottom: 55px;
        }

        .moment-heading h2 {
          max-width: 800px;
        }

        .moment-next {
          appearance: none;
          border: 1px solid var(--known-editorial-line);
          background: transparent;
          color: var(--known-editorial-muted);
          padding: 13px 15px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 17px;
          font-family: "IBM Plex Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .moment-next:hover {
          color: #fff;
          border-color: var(--known-editorial-line-strong);
        }

        .moment-interface {
          min-height: 570px;
          border: 1px solid var(--known-editorial-line);
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 81% 18%,
              rgba(231, 222, 239, 0.035),
              transparent 23%
            ),
            #09090b;
        }

        .moment-interface-top,
        .moment-interface-bottom {
          min-height: 56px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.11em;
        }

        .moment-interface-top {
          border-bottom: 1px solid var(--known-editorial-line);
        }

        .moment-interface-top > span:first-child {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .moment-interface-top i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--known-editorial-accent);
          display: inline-block;
        }

        .moment-interface-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          border-top: 1px solid var(--known-editorial-line);
        }

        .moment-body {
          width: min(810px, calc(100% - 90px));
          margin: 57px auto 90px;
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .moment-body.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .moment-body.is-hidden {
          opacity: 0;
          transform: translateY(7px);
        }

        .moment-meta {
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .moment-message-row {
          margin-top: 26px;
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }

        .moment-person {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border: 1px solid var(--known-editorial-line-strong);
          box-sizing: border-box;
          font-size: 7px;
          color: var(--known-editorial-muted);
        }

        .known-mark {
          grid-template-columns: 7px 7px;
          gap: 2px;
        }

        .known-mark i {
          width: 7px;
          height: 7px;
          background: #efebef;
          display: block;
        }

        .known-mark i:last-child {
          opacity: 0.28;
        }

        .moment-message {
          border: 1px solid var(--known-editorial-line);
          padding: 20px;
        }

        .moment-message p {
          margin: 0;
          max-width: 690px;
          font-family:
            "Inter Tight",
            Inter,
            sans-serif;
          font-size: 20px;
          line-height: 1.5;
          letter-spacing: -0.025em;
        }

        .known-response {
          border-color: rgba(231, 222, 239, 0.18);
          background: rgba(231, 222, 239, 0.025);
        }

        .known-response > span {
          color: var(--known-editorial-accent);
          font-size: 8px;
          letter-spacing: 0.13em;
        }

        .known-response small {
          display: block;
          margin-top: 18px;
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .moment-bridge {
          min-height: 98px;
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 16px;
          align-items: center;
        }

        .bridge-rule {
          width: 1px;
          height: 100%;
          justify-self: center;
          background: linear-gradient(
            180deg,
            rgba(231, 222, 239, 0.08),
            rgba(231, 222, 239, 0.44)
          );
        }

        .moment-bridge span {
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.12em;
        }

        .app-section {
          padding-bottom: 200px;
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 86px;
          align-items: center;
        }

        .app-copy {
          max-width: 500px;
        }

        .app-copy p {
          margin: 30px 0 22px;
          color: var(--known-editorial-muted);
          font-size: 16px;
          line-height: 1.64;
        }

        .app-link {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #fff;
          text-decoration: none;
          font-family: "IBM Plex Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .app-preview {
          border: 1px solid var(--known-editorial-line-strong);
          background: #08080a;
          box-shadow: 0 55px 120px rgba(0, 0, 0, 0.3);
        }

        .preview-top {
          min-height: 56px;
          padding: 0 19px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--known-editorial-line);
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.11em;
        }

        .preview-top > div {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--known-editorial-soft);
          font-weight: 700;
        }

        .preview-layout {
          min-height: 540px;
          display: grid;
          grid-template-columns: 60px minmax(0, 1fr);
        }

        .preview-nav {
          border-right: 1px solid var(--known-editorial-line);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 27px;
          padding-top: 38px;
        }

        .preview-nav span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #464249;
        }

        .preview-nav .active {
          background: var(--known-editorial-accent);
          box-shadow: 0 0 14px rgba(231, 222, 239, 0.3);
        }

        .preview-main {
          padding: 34px 42px;
          display: flex;
          flex-direction: column;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .preview-title {
          margin-top: 82px;
        }

        .preview-title small {
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .preview-title h3 {
          margin: 15px 0 0;
          font-size: clamp(37px, 4vw, 64px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 600;
        }

        .preview-title em {
          color: var(--known-editorial-dim);
          font-style: normal;
        }

        .preview-observation {
          margin-top: auto;
          border-top: 1px solid var(--known-editorial-line);
          padding-top: 18px;
          color: var(--known-editorial-dim);
          font-size: 8px;
          letter-spacing: 0.11em;
        }

        .preview-observation > div {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        .preview-observation p {
          max-width: 560px;
          margin: 14px 0 0;
          color: #c5c0c6;
          font-family:
            "Inter Tight",
            Inter,
            sans-serif;
          font-size: 15px;
          letter-spacing: -0.01em;
          line-height: 1.5;
        }

        .preview-footer {
          margin-top: 29px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--known-editorial-line);
        }

        .preview-footer div {
          padding-top: 16px;
          border-right: 1px solid var(--known-editorial-line);
        }

        .preview-footer div + div {
          padding-left: 17px;
        }

        .preview-footer div:last-child {
          border-right: 0;
        }

        .preview-footer small {
          color: var(--known-editorial-dim);
          font-size: 7px;
          letter-spacing: 0.1em;
        }

        .preview-footer strong {
          display: block;
          margin-top: 8px;
          font-family:
            "Inter Tight",
            Inter,
            sans-serif;
          font-size: 22px;
          font-weight: 500;
        }

        .final-section {
          padding: 65px 0 180px;
          display: grid;
          grid-template-columns: 0.75fr 1.25fr;
          gap: 90px;
          align-items: center;
          border-top: 1px solid var(--known-editorial-line);
        }

        .final-object {
          min-height: 500px;
          position: relative;
          display: grid;
          place-items: center;
        }

        .final-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .final-ring.ring-one {
          width: 360px;
          height: 360px;
        }

        .final-ring.ring-two {
          width: 260px;
          height: 450px;
          transform: rotate(29deg);
        }

        .final-ring.ring-three {
          width: 430px;
          height: 200px;
          transform: rotate(-18deg);
          border-color: rgba(231, 222, 239, 0.13);
        }

        .final-core {
          position: relative;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          border: 1px solid rgba(231, 222, 239, 0.23);
          background:
            radial-gradient(
              circle at center,
              rgba(231, 222, 239, 0.07),
              transparent 55%
            ),
            #09090b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 35px 90px rgba(0, 0, 0, 0.4);
        }

        .final-core::before {
          content: "";
          position: absolute;
          inset: 17px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.09);
        }

        .final-core small,
        .final-core span {
          position: relative;
          z-index: 1;
          font-family: "IBM Plex Mono", monospace;
          font-size: 7px;
          letter-spacing: 0.13em;
          color: var(--known-editorial-dim);
        }

        .final-core strong {
          position: relative;
          z-index: 1;
          margin: 11px 0;
          font-size: 24px;
          letter-spacing: 0.08em;
        }

        .final-copy {
          max-width: 850px;
        }

        .final-copy h2 {
          font-size: clamp(64px, 6vw, 108px);
        }

        .final-copy p {
          margin: 31px 0 37px;
          color: var(--known-editorial-muted);
          font-size: 16px;
          line-height: 1.62;
        }

        .editorial-footer {
          min-height: 92px;
          border-top: 1px solid var(--known-editorial-line);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          color: var(--known-editorial-dim);
          font-size: 10px;
        }

        .editorial-footer > span:nth-child(2) {
          text-align: center;
        }

        .footer-code {
          text-align: right;
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        @media (max-width: 1160px) {
          .editorial-hero {
            grid-template-columns: 1fr;
          }

          .hero-composition {
            min-height: 680px;
          }

          .marquee-track {
            grid-template-columns: repeat(4, 1fr);
          }

          .marquee-item:nth-child(n + 5) {
            border-top: 1px solid var(--known-editorial-line);
          }

          .signal-marquee {
            grid-template-columns: 170px 1fr;
          }

          .life-layout,
          .connect-section,
          .app-section,
          .final-section {
            grid-template-columns: 1fr;
          }

          .life-quote {
            position: static;
          }

          .connect-copy,
          .app-copy,
          .final-copy {
            max-width: 800px;
          }

          .final-object {
            max-width: 650px;
          }
        }

        @media (max-width: 760px) {
          .editorial-nav,
          .editorial-hero,
          .signal-marquee,
          .life-section,
          .connect-section,
          .statement-section,
          .moment-section,
          .app-section,
          .final-section,
          .editorial-footer {
            width: min(100% - 28px, 1440px);
          }

          .editorial-nav {
            height: 74px;
            grid-template-columns: 1fr auto;
          }

          .editorial-nav-mid {
            display: none;
          }

          .editorial-hero {
            min-height: auto;
            padding: 57px 0 75px;
          }

          .hero-copy h1 {
            font-size: clamp(58px, 16vw, 91px);
          }

          .hero-description {
            font-size: 16px;
          }

          .hero-composition {
            min-height: 500px;
            margin-top: 18px;
          }

          .composition-grid {
            background-size: 29px 29px;
          }

          .composition-object {
            width: 330px;
            height: 420px;
          }

          .object-layer.layer-back {
            width: 170px;
            height: 310px;
            left: 84px;
            top: 55px;
          }

          .object-layer.layer-middle {
            width: 185px;
            height: 320px;
            left: 91px;
            top: 45px;
          }

          .object-layer.layer-front {
            width: 190px;
            height: 325px;
            left: 68px;
            top: 48px;
          }

          .layer-front::before {
            inset: 13px;
          }

          .object-word {
            font-size: 27px;
          }

          .ring-a {
            width: 290px;
            height: 140px;
            left: 20px;
            top: 128px;
          }

          .ring-b {
            width: 255px;
            height: 112px;
            left: 38px;
            top: 178px;
          }

          .ring-c {
            width: 180px;
            height: 350px;
            left: 76px;
            top: 28px;
          }

          .object-signal {
            width: 110px;
          }

          .object-signal strong {
            font-size: 8px;
          }

          .object-signal small {
            font-size: 8px;
          }

          .signal-top {
            right: -3px;
            top: 5px;
          }

          .signal-right {
            right: -15px;
            top: 210px;
          }

          .signal-bottom {
            bottom: 4px;
            left: 0;
          }

          .signal-left {
            left: -8px;
            top: 122px;
          }

          .floating-coordinate,
          .caption-a,
          .caption-b {
            display: none;
          }

          .signal-marquee {
            grid-template-columns: 1fr;
            padding: 17px 0;
          }

          .marquee-track {
            margin-top: 15px;
            grid-template-columns: 1fr 1fr;
          }

          .marquee-item {
            min-height: 72px;
            border-top: 1px solid var(--known-editorial-line);
          }

          .life-section {
            padding: 100px 0 110px;
          }

          .section-heading h2,
          .connect-copy h2,
          .moment-heading h2,
          .app-copy h2 {
            font-size: clamp(47px, 13vw, 71px);
          }

          .life-layout {
            margin-top: 57px;
            gap: 58px;
          }

          .life-quote p {
            font-size: 37px;
          }

          .life-row {
            min-height: 78px;
            grid-template-columns: 32px 1fr 23px;
            gap: 12px;
          }

          .life-row-detail {
            display: none;
          }

          .life-row strong {
            font-size: 17px;
          }

          .connect-section {
            padding-bottom: 105px;
          }

          .connect-visual {
            height: 430px;
          }

          .connect-pivot {
            width: 105px;
            height: 105px;
          }

          .connect-word {
            font-size: 8px;
          }

          .connect-path {
            width: 140px !important;
          }

          .statement-section {
            padding: 85px 0 110px;
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .statement-main,
          .statement-secondary {
            font-size: clamp(37px, 10vw, 56px);
          }

          .moment-section {
            padding-bottom: 110px;
          }

          .moment-heading {
            display: block;
          }

          .moment-next {
            margin-top: 24px;
          }

          .moment-interface {
            min-height: 600px;
          }

          .moment-body {
            width: calc(100% - 28px);
            margin-top: 44px;
          }

          .moment-message-row {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 10px;
          }

          .moment-person {
            width: 34px;
            height: 34px;
          }

          .moment-message p {
            font-size: 16px;
          }

          .moment-bridge {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 10px;
          }

          .app-section {
            padding-bottom: 110px;
          }

          .preview-layout {
            min-height: 440px;
            grid-template-columns: 46px minmax(0, 1fr);
          }

          .preview-main {
            padding: 26px 20px;
          }

          .preview-title {
            margin-top: 57px;
          }

          .preview-title h3 {
            font-size: 35px;
          }

          .final-section {
            padding: 60px 0 110px;
          }

          .final-object {
            min-height: 380px;
          }

          .final-ring.ring-one {
            width: 280px;
            height: 280px;
          }

          .final-ring.ring-two {
            width: 205px;
            height: 340px;
          }

          .final-ring.ring-three {
            width: 315px;
            height: 160px;
          }

          .final-core {
            width: 145px;
            height: 145px;
          }

          .final-copy h2 {
            font-size: clamp(58px, 16vw, 88px);
          }

          .editorial-footer {
            min-height: 125px;
            grid-template-columns: 1fr;
            align-items: start;
            padding: 22px 0;
            gap: 15px;
          }

          .editorial-footer > span:nth-child(2) {
            text-align: left;
          }

          .footer-code {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .hero-button,
          .final-button,
          .editorial-enter,
          .life-row,
          .moment-body {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}