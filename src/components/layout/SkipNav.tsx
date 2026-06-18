/**
 * SkipNav - Accessibility skip navigation component.
 *
 * Visually hidden until focused, then appears as a prominent overlay.
 * The .skip-link utility class is defined in globals.css.
 * Target: #main-content on the <main> element in (site)/layout.tsx.
 */
export function SkipNav() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  )
}