# BaseIconButton

A customizable icon button component that follows the design system guidelines.

## Features

- Multiple variants: flat (standard), outlined, text, tonal, elevated
- Interactive states: hover, focus, active, disabled
- Dynamic icon support using RemixIcon
- Toggle functionality
- Customizable sizes and colors
- Accessibility support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | String | 'flat' | Button style variant ('flat', 'outlined', 'text', 'tonal', 'elevated') |
| icon | String | 'ri-arrow-right-line' | RemixIcon class name |
| size | String | 'default' | Button size ('x-small', 'small', 'default', 'large', 'x-large') |
| disabled | Boolean | false | Disables the button |
| loading | Boolean | false | Shows loading state |
| color | String | 'primary' | Button color |
| isToggle | Boolean | false | Enables toggle functionality |
| initialToggled | Boolean | false | Initial toggle state |
| toggleIcon | String | '' | Icon to show when toggled |
| toggleColor | String | '' | Color to use when toggled |
| density | String | 'default' | Button padding density |
| ariaLabel | String | '' | Accessibility label |
| iconSize | String/Number | '' | Custom icon size |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| click | Event | Emitted when button is clicked |
| toggle | Boolean | Emitted when toggle state changes |

## Usage

```vue
<template>
  <!-- Standard icon button -->
  <BaseIconButton 
    icon="ri-home-line"
    variant="flat"
  />

  <!-- Outlined icon button -->
  <BaseIconButton 
    icon="ri-settings-line"
    variant="outlined"
  />

  <!-- Toggle icon button -->
  <BaseIconButton 
    icon="ri-heart-line"
    toggle-icon="ri-heart-fill"
    is-toggle
    color="error"
  />
</template>
```

## Variants

### Standard (flat)
- Primary action buttons
- Most prominent in hierarchy
- Used for main actions

### Outlined
- Secondary actions
- Less prominent than standard
- Used for supporting actions

### Text
- Tertiary actions
- Least prominent
- Used for optional actions

### Tonal
- Alternative to standard
- Softer visual weight
- Used for important but not primary actions

### Elevated
- Special emphasis
- Used sparingly
- Adds depth with shadow