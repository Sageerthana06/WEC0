import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================================
// ASSET CONSTANTS
// ============================================================================
const PORTAL_BG =
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779974947/portal_bg_mu60k9.png";
const CURTAIN_LEFT =
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/curtain_left_cdht6q.png";
const CURTAIN_RIGHT =
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975071/curtain_right_a9bn3i.png";
const WORLD_BG =
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975077/world_bg_jzzcn1.jpg";

// The cards MUST remain in this exact order (Card 3, Card 1, Card 2)
const CARD_IMAGES = [
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_3_nbwm25.jpg",
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_2_wr6al6.jpg", // Representing Card 1
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1779975070/card_1_jz8otj.jpg", // Representing Card 2
];

// ============================================================================
// PARALLAX MAGNITUDES
// ============================================================================
const MAG = {
  world: 6,
  portal: 7,
  curtainL: 14,
  curtainR: 14,
};

// ============================================================================
// MATH UTILITIES
// ============================================================================
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// Hook for mobile responsiveness
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

// Hook for tablet responsiveness
const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1099px)",
    );
    setIsTablet(mediaQuery.matches);

    const handleChange = (e) => setIsTablet(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isTablet;
};

// Hook for desktop responsiveness
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
};

// ============================================================================
// SVG STAR LOGO COMPONENT
// ============================================================================
const StarLogo = () => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="white">
    <path d="M14 2l2.09 6.42H23l-5.45 3.96 2.09 6.42L14 18.8l-5.45 3.96 2.09-6.42L5 8.42h6.91L14 2z" />
  </svg>
);

// ============================================================================
// SVG PLAY BUTTON COMPONENT
// ============================================================================
const PlayButton = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

// ============================================================================
// SVG CHEVRON COMPONENT (for scroll cue)
// ============================================================================
const ChevronDown = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// ============================================================================
// NAVIGATION BAR COMPONENT
// ============================================================================
const NavigationBar = ({ isMobile, isTablet, isDesktop }) => {
  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: isMobile ? "18px 20px" : "22px 48px",
        display: "flex",
        justifyContent: isDesktop ? "space-between" : "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Desktop Left Links */}
      {isDesktop && (
        <div style={{ display: "flex", gap: "32px" }}>
          {["Worlds", "Atelier", "Immersions"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "white",
                opacity: 0.9,
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      {/* Mobile Left Link */}
      {isMobile && (
        <a
          href="#"
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            color: "white",
            opacity: 0.9,
            textDecoration: "none",
            textTransform: "uppercase",
            position: "absolute",
            left: "20px",
          }}
        >
          Explore
        </a>
      )}

      {/* Center Star Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StarLogo />
      </div>

      {/* Desktop Right Links */}
      {isDesktop && (
        <div style={{ display: "flex", gap: "32px" }}>
          {["Craft", "Codex", "Connect"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "12px",
                letterSpacing: "0.12em",
                color: "white",
                opacity: 0.9,
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      {/* Mobile Right Link */}
      {isMobile && (
        <a
          href="#"
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            color: "white",
            opacity: 0.9,
            textDecoration: "none",
            textTransform: "uppercase",
            position: "absolute",
            right: "20px",
          }}
        >
          Connect
        </a>
      )}
    </nav>
  );
};

// ============================================================================
// CARD COMPONENT
// ============================================================================
const Card = ({ image, overlay, type = "reel" }) => (
  <div
    style={{
      position: "relative",
      width: "158px",
      height: "158px",
      borderRadius: "28px",
      overflow: "hidden",
      flexShrink: 0,
    }}
  >
    <img
      src={image}
      alt="Card"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "12px",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
      }}
    >
      {overlay}
    </div>
  </div>
);

// ============================================================================
// SLIDER DOTS COMPONENT
// ============================================================================
const SliderDots = ({ isMobile, isTablet, isDesktop }) => (
  <div
    style={{
      position: "absolute",
      bottom: "60px",
      left: isMobile ? "50%" : "60px",
      transform: isMobile ? "translateX(-50%)" : "none",
      display: "flex",
      gap: "12px",
      zIndex: 10,
    }}
  >
    {[0, 1, 2, 3].map((index) => (
      <div
        key={index}
        style={{
          width: index === 0 ? "28px" : "14px",
          height: "4px",
          borderRadius: "2px",
          background: "white",
          opacity: 0.8,
        }}
      />
    ))}
  </div>
);

// ============================================================================
// SCROLL CUE COMPONENT
// ============================================================================
const ScrollCue = ({ isMobile }) => {
  if (isMobile) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
        }}
      >
        Descend
      </div>
      <div
        style={{
          width: "34px",
          height: "34px",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.6)",
          animation: "bobUp 1.8s ease-in-out infinite",
        }}
      >
        <ChevronDown />
      </div>
    </div>
  );
};

// ============================================================================
// MAIN REVERIE HERO COMPONENT
// ============================================================================
const ReverieHero = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  // Scroll and animation state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMousePos, setSmoothMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // Refs for parallax layers
  const worldRef = useRef(null);
  const portalRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const stickyContainerRef = useRef(null);

  // Page setup: Set to 480vh height
  useEffect(() => {
    document.documentElement.style.height = "480vh";
    return () => {
      document.documentElement.style.height = "auto";
    };
  }, []);

  // Component mounting
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setEntranceComplete(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    setScrollProgress(clamp(progress, 0, 1));
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const x = (e.clientX - centerX) / centerX;
    const y = (e.clientY - centerY) / centerY;
    setMousePos({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
  }, []);

  // Smooth mouse tracking with RAF
  useEffect(() => {
    let animationId;

    const tick = () => {
      setSmoothMousePos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.07),
        y: lerp(prev.y, mousePos.y, 0.07),
      }));
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  // Listen to scroll and mouse events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  // Apply animations
  useEffect(() => {
    const rx = smoothMousePos.x;
    const ry = smoothMousePos.y;

    // World Layer
    if (worldRef.current) {
      const scale = lerp(1, 1.18, scrollProgress);
      worldRef.current.style.transform = `scale(${scale}) translate3d(${rx * MAG.world}px, ${ry * MAG.world}px, 0)`;
    }

    // Portal Frame
    if (portalRef.current) {
      const scale = lerp(1, 7.5, scrollProgress);
      const opacity = clamp(1 - (scrollProgress - 0.65) / 0.2, 0, 1);
      portalRef.current.style.transform = `scale(${scale}) translate3d(${rx * MAG.portal}px, ${ry * MAG.portal}px, 0)`;
      portalRef.current.style.opacity = opacity;
      portalRef.current.style.transformOrigin = "52% 38%";
    }

    // Curtain Left
    if (curtainLeftRef.current) {
      const easedProgress = easeInOut(scrollProgress);
      const initialOffset = 62;
      const scrollOffset = 150 * easedProgress;
      const totalShift = initialOffset + scrollOffset;
      const curtainScrollScale = lerp(1, 1.3, scrollProgress);
      curtainLeftRef.current.style.transform = `translateX(calc(-${totalShift}% + ${rx * MAG.curtainL}px)) translateY(${ry * MAG.curtainL * 0.3}px) scale(${curtainScrollScale}) translateZ(0)`;
    }

    // Curtain Right
    if (curtainRightRef.current) {
      const easedProgress = easeInOut(scrollProgress);
      const initialOffset = 62;
      const scrollOffset = 150 * easedProgress;
      const totalShift = initialOffset + scrollOffset;
      const curtainScrollScale = lerp(1, 1.3, scrollProgress);
      curtainRightRef.current.style.transform = `translateX(calc(${totalShift}% + ${rx * MAG.curtainR}px)) translateY(${ry * MAG.curtainR * 0.3}px) scale(${curtainScrollScale}) translateZ(0)`;
    }
  }, [scrollProgress, smoothMousePos]);

  if (
    !mounted ||
    isMobile === undefined ||
    isTablet === undefined ||
    isDesktop === undefined
  ) {
    return null;
  }

  // Calculate scene opacities
  const scene1Opacity = clamp(1 - scrollProgress / 0.22, 0, 1);
  const scene2Opacity = clamp((scrollProgress - 0.68) / 0.16, 0, 1);

  // Entrance animation styles
  const entranceStyle = {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: entranceComplete ? "none" : "all 0.9s ease 0.3s",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation Bar */}
      <NavigationBar
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      />

      {/* Sticky Container - 100vh height */}
      <div
        ref={stickyContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* World Background */}
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${WORLD_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />

        {/* Portal Frame */}
        <div
          ref={portalRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${PORTAL_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            zIndex: 5,
          }}
        />

        {/* Curtain Left */}
        <div
          ref={curtainLeftRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${CURTAIN_LEFT})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
            willChange: "transform",
            zIndex: 10,
          }}
        />

        {/* Curtain Right */}
        <div
          ref={curtainRightRef}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${CURTAIN_RIGHT})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
            willChange: "transform",
            zIndex: 10,
          }}
        />

        {/* Scene 1: Hero Section */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene1Opacity,
            pointerEvents: scene1Opacity > 0 ? "auto" : "none",
          }}
        >
          {/* Mobile Hero Layout */}
          {isMobile && (
            <div style={{ ...entranceStyle, textAlign: "center", zIndex: 25 }}>
              <h1
                style={{
                  fontFamily: "'Viaoda Libre', serif",
                  fontSize: "32px",
                  color: "#3b1a0a",
                  marginBottom: "16px",
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                }}
              >
                FALL › INTO REVERIE
              </h1>
              <p
                style={{
                  fontFamily: "'Imprima', sans-serif",
                  fontSize: "14px",
                  color: "#3b1a0a",
                  maxWidth: "280px",
                  margin: "0 auto 32px",
                  lineHeight: 1.6,
                }}
              >
                Discover extraordinary worlds where imagination meets reality.
              </p>
              <Card
                image={CARD_IMAGES[0]}
                overlay={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0a0608",
                      }}
                    >
                      <PlayButton />
                    </div>
                    <span style={{ fontSize: "12px", color: "white" }}>
                      View Reel
                    </span>
                  </div>
                }
              />
              <SliderDots
                isMobile={isMobile}
                isTablet={isTablet}
                isDesktop={isDesktop}
              />
              <ScrollCue isMobile={isMobile} />
            </div>
          )}

          {/* Tablet Hero Layout */}
          {isTablet && (
            <div style={{ ...entranceStyle, textAlign: "center", zIndex: 25 }}>
              <h1
                style={{
                  fontFamily: "'Viaoda Libre', serif",
                  fontSize: "42px",
                  color: "#3b1a0a",
                  marginBottom: "16px",
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                }}
              >
                FALL › INTO REVERIE
              </h1>
              <p
                style={{
                  fontFamily: "'Imprima', sans-serif",
                  fontSize: "14px",
                  color: "#3b1a0a",
                  maxWidth: "400px",
                  margin: "0 auto 32px",
                  lineHeight: 1.6,
                }}
              >
                Discover extraordinary worlds where imagination meets reality.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <Card
                  image={CARD_IMAGES[0]}
                  overlay={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0a0608",
                        }}
                      >
                        <PlayButton />
                      </div>
                      <span style={{ fontSize: "12px", color: "white" }}>
                        View Reel
                      </span>
                    </div>
                  }
                />
                <Card
                  image={CARD_IMAGES[1]}
                  overlay={
                    <div
                      style={{
                        fontSize: "28px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      32
                    </div>
                  }
                />
                <Card
                  image={CARD_IMAGES[2]}
                  overlay={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0a0608",
                        }}
                      >
                        <PlayButton />
                      </div>
                      <span style={{ fontSize: "12px", color: "white" }}>
                        View Reel
                      </span>
                    </div>
                  }
                />
              </div>
              <SliderDots
                isMobile={isMobile}
                isTablet={isTablet}
                isDesktop={isDesktop}
              />
              <ScrollCue isMobile={isMobile} />
            </div>
          )}

          {/* Desktop Hero Layout */}
          {isDesktop && (
            <div
              style={{
                ...entranceStyle,
                display: "flex",
                width: "100%",
                alignItems: "center",
                zIndex: 25,
              }}
            >
              {/* Left Container */}
              <div
                style={{
                  position: "absolute",
                  left: "60px",
                  top: "46%",
                  transform: "translateY(-50%)",
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Viaoda Libre', serif",
                    fontSize: "52px",
                    color: "white",
                    marginBottom: "24px",
                    letterSpacing: "0.02em",
                    lineHeight: 1.1,
                    maxWidth: "440px",
                  }}
                >
                  FALL › INTO REVERIE
                </h1>
                <p
                  style={{
                    fontFamily: "'Imprima', sans-serif",
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.82)",
                    maxWidth: "440px",
                    lineHeight: 1.6,
                  }}
                >
                  Discover extraordinary worlds where imagination meets reality.
                  Step through the veil into experiences beyond the ordinary.
                </p>
              </div>

              {/* Right Container - Cards */}
              <div
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  gap: "24px",
                }}
              >
                <Card
                  image={CARD_IMAGES[0]}
                  overlay={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0a0608",
                        }}
                      >
                        <PlayButton />
                      </div>
                      <span style={{ fontSize: "12px", color: "white" }}>
                        View Reel
                      </span>
                    </div>
                  }
                />
                <Card
                  image={CARD_IMAGES[1]}
                  overlay={
                    <div
                      style={{
                        fontSize: "28px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      32
                    </div>
                  }
                />
                <Card
                  image={CARD_IMAGES[2]}
                  overlay={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#0a0608",
                        }}
                      >
                        <PlayButton />
                      </div>
                      <span style={{ fontSize: "12px", color: "white" }}>
                        View Reel
                      </span>
                    </div>
                  }
                />
              </div>

              <SliderDots
                isMobile={isMobile}
                isTablet={isTablet}
                isDesktop={isDesktop}
              />
              <ScrollCue isMobile={isMobile} />
            </div>
          )}
        </div>

        {/* Scene 2: Call to Action (Forge Beyond) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: scene2Opacity,
            pointerEvents: scene2Opacity > 0 ? "auto" : "none",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "600px",
              padding: "40px 20px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Viaoda Libre', serif",
                fontSize: "clamp(38px, 6vw, 78px)",
                color: "#ffffff",
                marginBottom: "24px",
                letterSpacing: "0.03em",
                lineHeight: 1.05,
                textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              FORGE BEYOND THE REAL
            </h2>
            <p
              style={{
                fontFamily: "'Imprima', sans-serif",
                fontSize: isMobile ? "14px" : "20px",
                color: "rgba(255,255,255,0.82)",
                maxWidth: isMobile ? "260px" : "480px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Singular voyages to astonishing destinations, shaped for those who
              seek beauty beyond the ordinary and the known.
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for scroll height */}
      <div style={{ position: "relative", height: "380vh", zIndex: 0 }} />
    </div>
  );
};

export default ReverieHero;
