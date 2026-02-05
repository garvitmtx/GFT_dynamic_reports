import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");

  const navRefs = useRef({});
  const indicatorRef = useRef(null);
  const navContainerRef = useRef(null);

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "functions", label: "Functions" },
    { id: "microbes", label: "Microbes" },
    { id: "metabolites", label: "Metabolites" },
    { id: "history", label: "History" },
  ];

  // 1. Force the indicator to move immediately on click
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id); // Move indicator instantly
    
    el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setOpen(false);
  };

//   SCROLL SPY
useEffect(() => {
    const sections = menuItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    // DEBUG: Check if sections were actually found
    console.log("Sections detected by Navbar:", sections.map(s => s.id));

    if (sections.length === 0) {
      console.error("Navbar Error: No sections found with matching IDs!");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // DEBUG: See which ID is being activated on scroll
            console.log("📍 Intersection Observer triggered for:", entry.target.id);
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px", // Adjusts the "hit zone"
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

  // 3. Calculation logic
  const moveIndicator = () => {
    const activeBtn = navRefs.current[active];
    const indicator = indicatorRef.current;
    const container = navContainerRef.current;

    if (!activeBtn || !indicator || !container) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate position relative to the UL container
    const leftPosition = btnRect.left - containerRect.left;

    indicator.style.width = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${leftPosition}px)`;
  };

  // Run whenever active state or window size changes
  useLayoutEffect(() => {
    moveIndicator();
  }, [active]);

  useEffect(() => {
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [active]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <img src={logo} className="logo" alt="logo" />

        <ul ref={navContainerRef} className="nav-links">
          {/* Use Transform for better performance */}
          <span ref={indicatorRef} className="nav-indicator" />

          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                ref={(el) => (navRefs.current[item.id] = el)}
                className={active === item.id ? "active" : ""}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="signin-btn">Sign In</button>

        <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-drawer ${open ? "show" : ""}`}>
        {menuItems.map((item) => (
          <p key={item.id} onClick={() => scrollToSection(item.id)}>
            {item.label}
          </p>
        ))}
      </div>
    </>
  );
}