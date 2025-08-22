---
applyTo: '**'
---

# Color Scheme Editing Instructions

This project uses a gold/black color scheme, implemented via Tailwind CSS utility classes (e.g., text-gold, bg-black-light). To change the color scheme across the website, follow these steps:

1. **Identify Color Classes**: Locate all Tailwind color utility classes in the codebase, especially those using gold/black (e.g., text-gold, bg-black-light, border-gold, etc.).

2. **Update Tailwind Config**:
    - Open `tailwind.config.js`.
    - Change the color values for custom colors (e.g., `gold`, `black-light`) under the `theme.extend.colors` section.
    - Example:
      ```js
      theme: {
         extend: {
            colors: {
              gold: '#FFD700', // Change this to your new primary color
              'black-light': '#181818', // Change this to your new background color
            }
         }
      }
      ```

3. **Global Styles**:
    - If there are any global CSS overrides (e.g., in `src/index.css`), update color variables or custom classes accordingly.

4. **Component Classes**:
    - In `src/components/`, update any hardcoded color classes in JSX/TSX files to use the new color names if you renamed them.
    - Ensure all UI elements (buttons, navbars, cards, etc.) use the updated color classes.

5. **Pages**:
    - In `src/pages/`, check for page-specific color usage and update as needed.

6. **Admin/Protected Routes**:
    - Ensure admin dashboards and protected routes also use the updated color scheme.

7. **Test Responsiveness**:
    - After changes, verify the color scheme is consistent across all pages, components, and states (loading, error, etc.).

8. **Accessibility**:
    - Ensure sufficient color contrast for text and backgrounds after changing colors.

**Tip:** Use Tailwind’s `@apply` directive in CSS for repeated color patterns, and consider using CSS variables for easier future updates.

**Summary Table:**

| Area                | Where to Update                | What to Change                |
|---------------------|-------------------------------|-------------------------------|
| Tailwind Config     | `tailwind.config.js`           | Color definitions             |
| Global Styles       | `src/index.css` or similar     | CSS variables/custom classes  |
| Components          | `src/components/`              | Tailwind color classes        |
| Pages               | `src/pages/`                   | Tailwind color classes        |
| Admin/Protected     | `src/pages/admin/`, etc.       | Tailwind color classes        |

Always test the site after changes to ensure visual consistency.