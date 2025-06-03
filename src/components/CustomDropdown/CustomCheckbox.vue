<template>
    <v-checkbox
      v-bind="$attrs"
      v-on="$listeners"
      :ripple="false"
      class="custom-checkbox"
    >
      <template v-slot:label>
        <slot name="label">
          {{ label }}
        </slot>
      </template>
      
      <template v-slot:selection="{ on }">
        <ri-checkbox-blank-line
          v-if="!$attrs.value"
          v-on="on"
          class="checkbox-icon"
        />
        <ri-checkbox-fill
          v-else
          v-on="on"
          class="checkbox-icon checked"
        />
      </template>
    </v-checkbox>
  </template>
  
  <script>
  
  export default {
    name: 'CustomCheckbox',
    
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      }
    }
  };
  </script>
  
  <style scoped>
  .checkbox-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.54);
    transition: all 0.2s ease-in-out;
  }
  
  .checkbox-icon.checked {
    color: var(--v-primary-base);
  }
  
  /* Adjust the checkbox position to match Vuetify's default styling */
  .custom-checkbox ::v-deep .v-input--selection-controls__input {
    margin-right: 8px;
  }
  </style>