<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="mb-6">Design System Components</h1>
        
        <h2 class="mb-4">Text Input</h2>
        <div class="d-flex flex-wrap gap-4 mb-8">
          <BaseTextField
            label="Default Input"
            placeholder="Enter some text..."
            variant="outlined"
          />
          
          <BaseTextField
            label="Filled Input"
            placeholder="Enter some text..."
            variant="filled"
          />
          
          <BaseTextField
            label="Solo Input"
            placeholder="Enter some text..."
            variant="solo"
          />
          
          <BaseTextField
            label="Error State"
            placeholder="Enter some text..."
            error
            error-messages="This field has an error"
          />
        </div>
        
        <h2 class="mb-4">Buttons</h2>
        <div class="d-flex flex-wrap gap-4 mb-8">
          <BaseButton>Primary Button</BaseButton>
          
          <BaseButton variant="outlined">Outlined Button</BaseButton>
          
          <BaseButton variant="text">Text Button</BaseButton>
          
          <BaseButton loading>Loading</BaseButton>
          
          <BaseButton disabled>Disabled</BaseButton>
        </div>
        
        <h2 class="mb-4">Icon Buttons</h2>
        <div class="d-flex flex-wrap gap-4">
          <BaseIconButton icon="ri-home-line" />
          
          <BaseIconButton icon="ri-add-line" variant="outlined" />
          
          <BaseIconButton icon="ri-delete-bin-line" color="error" />
          
          <BaseIconButton icon="ri-heart-line" is-toggle toggle-icon="ri-heart-fill" color="error" />
          
          <BaseIconButton icon="ri-settings-line" disabled />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import BaseTextField from './components/BaseTextField/BaseTextField.vue';
import BaseButton from './components/BaseButton/BaseButton.vue';
import BaseIconButton from './components/BaseIconButton/BaseIconButton.vue';
</script>