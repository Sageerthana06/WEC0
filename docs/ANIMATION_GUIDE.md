# Framer Motion Animation Guide

This document explains the smooth animations now integrated throughout your WMC website using **Framer Motion**.

## 🎯 Overview

Your website now features:

- ✅ Smooth page transitions
- ✅ Scroll reveal animations
- ✅ Hover effects on buttons, cards, and images
- ✅ Animated navbar with scroll effects
- ✅ Enhanced loading spinner
- ✅ Floating icon animations
- ✅ Staggered list animations
- ✅ Responsive animations on mobile & desktop

## 📁 Animation Architecture

### 1. Core Animation Files

**`src/components/animations/AnimationVariants.js`**

- Contains reusable Framer Motion animation presets
- Variants for fade, scale, slide, and other effects
- Used throughout components for consistency

**`src/components/animations/AnimatedComponents.jsx`**

- Wrapper components that make animations easy to use
- `ScrollReveal` - Reveals content on scroll
- `FadeInUp` - Fades in and slides up
- `StaggerContainer` & `StaggerItem` - Staggered animations
- `HoverScale` - Scale animation on hover
- `FloatingElement` - Floating up/down effect
- `PulseElement` - Pulsing animation
- `PageTransition` - Page entry/exit animations
- And more...

**`src/components/animations/AnimatedLoadingSpinner.jsx`**

- Enhanced loading spinner with dual rotating/pulsing effect

### 2. Layout Animations

**`src/components/layout/Navbar.jsx`**

- Animated logo on hover with rotation
- Smooth navbar background transition on scroll
- Animated nav links with sliding underline
- Rotating hamburger menu icon
- Staggered mobile menu items
- Floating map icon
- Rotating theme toggle

**`src/components/layout/MainLayout.jsx`**

- Page content fade-in and slide animations

### 3. Page Animations

#### Home Page (`src/pages/Home.jsx`)

- Staggered service cards
- Hover animations on stat cards
- Floating partner names
- CTA button with scale and glow effects

#### Services Page (`src/pages/Services.jsx`)

- Animated search input glow
- Layout animation for filtered results
- Staggered service card animations
- Featured badge scale-in animation

#### Gallery Page (`src/pages/Gallery.jsx`)

- Tab button animations on mount
- Image hover and zoom effects
- Layout animation when filtering
- Play button animation for videos
- Lightbox modal with spring animations
- Delete button rotate-scale on hover

#### About Page (`src/pages/About.jsx`)

- Staggered achievement cards
- Floating CEO image
- Team member cards with scale and lift effects
- Icon animations with floating motion

#### Contact Page (`src/pages/Contact.jsx`)

- Staggered form field animations
- Contact info items with slide-in on hover
- Social icons with scale and rotate effects
- Floating contact icons

### 4. UI Component Animations

**`src/components/ui/CatalogCard.jsx`**

- Image zoom on hover
- Icon overlay with spring animation
- Content fade-in

**`src/components/ui/GlassCard.jsx`**

- Hover lift effect (y-axis movement)
- Scale and spring physics

## 🎨 Animation Types

### 1. Scroll Reveal

Elements animate in as they enter the viewport:

```jsx
<ScrollReveal>
  <YourContent />
</ScrollReveal>
```

### 2. Fade In Up

Content fades in and slides up:

```jsx
<FadeInUp delay={0.2}>
  <YourContent />
</FadeInUp>
```

### 3. Stagger

Multiple items animate with delays:

```jsx
<StaggerContainer>
  {items.map((item) => (
    <StaggerItem key={item.id}>{item}</StaggerItem>
  ))}
</StaggerContainer>
```

### 4. Hover Effects

Scale, lift, and glow on hover:

```jsx
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click Me
</motion.button>
```

### 5. Floating

Continuous up/down motion:

```jsx
<FloatingElement duration={3} distance={10}>
  <Icon />
</FloatingElement>
```

## 🔧 Using Animations

### Basic Example - ScrollReveal

```jsx
import { ScrollReveal } from "../components/animations/AnimatedComponents";

export function MyComponent() {
  return (
    <ScrollReveal>
      <h1>This fades and slides up when visible</h1>
    </ScrollReveal>
  );
}
```

### Advanced Example - Stagger with Custom Variants

```jsx
import { motion } from "framer-motion";

export function MyList({ items }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## ⚙️ Configuration

### Page Transitions

Controlled in `src/App.jsx` using `AnimatePresence`:

```jsx
<AnimatePresence mode="wait">
  <Routes>{/* ... */}</Routes>
</AnimatePresence>
```

### Loading Spinner

Changed in `src/components/ui/LoadingSpinner.jsx` to use enhanced animated version.

### Navbar Animations

Scroll detection triggers navbar blur effect. Controlled in `src/components/layout/Navbar.jsx`:

- Scrolled > 20px: Background darkens and blur increases
- Animations are smooth with ~300ms transitions

## 📱 Mobile Responsiveness

All animations are fully responsive:

- Touch-friendly hover states on mobile
- Reduced motion for performance on low-end devices
- Stagger timings adjust based on viewport
- Gallery animations work with touch gestures

## 🎯 Performance Tips

1. **Use `viewport={{ once: true }}`** for scroll animations to prevent re-triggering
2. **Limit stagger children** - Don't stagger more than 8-10 items
3. **Use `initial={false}`** on toggle animations to prevent on-mount animation
4. **Optimize images** - Animations on large images impact performance
5. **Test on mobile** - Always preview on actual devices

## 🔄 Common Patterns

### Hover + Tap Button

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  Interactive Button
</motion.button>
```

### Animated List

```jsx
<motion.ul
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.li
      key={item.id}
      variants={
        {
          /* ... */
        }
      }
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

### Image Hover Zoom

```jsx
<motion.div
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.4 }}
  className="overflow-hidden rounded-2xl"
>
  <img src="image.jpg" alt="" />
</motion.div>
```

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/) - Official documentation
- [Animation Variants](https://www.framer.com/motion/animation-controls/) - Understanding variants
- [Gesture Controls](https://www.framer.com/motion/gestures/) - Hover, tap, drag
- [Scroll Animations](https://www.framer.com/motion/scroll-animations/) - Scroll-triggered effects

## 🚀 Next Steps

1. **Customize timings** - Adjust `duration`, `delay`, and `stiffness` values
2. **Add more icons** - Use FloatingElement on more parts
3. **Create page themes** - Different animations per page type
4. **Add sound effects** - Trigger audio on key animations (optional)
5. **Advanced transitions** - Use `AnimatePresence` for more complex flows

## ⚡ Troubleshooting

### Animations not triggering?

- Check `whileInView` with `viewport={{ once: true }}`
- Ensure parent component isn't preventing animation
- Verify Framer Motion is imported

### Performance issues?

- Reduce number of animated elements on screen
- Use `layout` animation sparingly
- Optimize images before animating
- Test on mobile devices

### Animations feel sluggish?

- Increase `stiffness` in spring transitions
- Reduce `duration` for quicker animations
- Use `ease: "easeOut"` instead of custom easing

---

**Happy animating! 🎨✨**
