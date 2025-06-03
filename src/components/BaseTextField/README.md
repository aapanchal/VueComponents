# BaseTextField

A customizable text input component that follows the design system guidelines.

## Features

- Multiple variants: outlined, filled, solo
- Support for labels and placeholders
- Error and success states
- Character counter
- Icon support (prefix and suffix)
- Title, tooltip, and required state
- Accessibility support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | String/Number | '' | Current input value |
| title | String | '' | Title text above input |
| required | Boolean | false | Makes the field required |
| tooltip | String | '' | Tooltip text |
| label | String | '' | Input label |
| placeholder | String | '' | Placeholder text |
| variant | String | 'outlined' | Input style variant |
| readonly | Boolean | false | Makes the field readonly |
| disabled | Boolean | false | Disables the field |
| error | Boolean | false | Shows error state |
| errorMessages | String/Array | [] | Error messages |
| loading | Boolean | false | Shows loading state |
| clearable | Boolean | false | Adds clear button |
| counter | Boolean/Number | false | Character counter |
| density | String | undefined | Input padding density |
| prependIcon | String | '' | Icon before input |
| appendIcon | String | '' | Icon after input |
| prependInnerIcon | String | '' | Icon inside start of input |
| appendInnerIcon | String | '' | Icon inside end of input |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| update:modelValue | String/Number | Emitted when value changes |
| blur | Event | Emitted on input blur |
| focus | Event | Emitted on input focus |

## Usage

```vue
<template>
  <!-- Basic text field -->
  <BaseTextField
    v-model="value"
    label="Username"
    placeholder="Enter username"
  />

  <!-- Required field with title and tooltip -->
  <BaseTextField
    v-model="email"
    title="Email Address"
    tooltip="Enter your primary email"
    required
    label="Email"
  />

  <!-- Field with error -->
  <BaseTextField
    v-model="password"
    label="Password"
    type="password"
    :error="true"
    error-messages="Password is required"
  />

  <!-- Field with icons -->
  <BaseTextField
    v-model="search"
    label="Search"
    prepend-inner-icon="ri-search-line"
    append-inner-icon="ri-close-line"
    clearable
  />
</template>
```

## Variants

### Outlined
- Default variant
- Clear boundaries
- Used for most forms

### Filled
- Alternative to outlined
- Subtle background
- Used for dense forms

### Solo
- Elevated appearance
- Most prominent
- Used for search or prominent inputs