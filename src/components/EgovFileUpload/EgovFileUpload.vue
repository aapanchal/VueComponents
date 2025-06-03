<template>
  <div class="egov-file-upload">
    <!-- Title and Helper Text -->
    <div class="title-wrapper">
      <v-label :for="fileUploadInput" class="upload-label">{{ title }}</v-label>
    </div>
    <div class="helper-text-wrapper">
      <span class="helper-text">{{ helperText }}</span>
    </div>

    <!-- Button Upload Variant -->
    <div v-if="variant === 'button'">
      <v-file-input
        ref="fileInput"
        v-model="selectedFiles"
        :accept="acceptedTypes"
        :disabled="disabled"
        multiple
        hide-details
        class="custom-file-input"
        prepend-icon=""
        @update:modelValue="handleFileChange"
      >
        <template #selection>
          <!-- Hide default selection display -->
        </template>
        <template #prepend-inner>
          <div class="custom-browse-btn" :class="{ 'disabled': disabled }">
            <v-label class="browse-label">Browse files</v-label>
            <v-icon class="browse-icon">ri-upload-line</v-icon>
          </div>
        </template>
      </v-file-input>

      <!-- File List -->
      <div v-if="computedFiles.length > 0" class="file-list">
        <div
          v-for="file in computedFiles"
          :key="file.id"
          class="file-item"
          :class="{ 'error-state': file.error }"
        >
          <span class="file-name">{{ file.name }}</span>
          <v-progress-circular
            v-if="file.status === 'uploading'"
            size="16"
            width="2"
            indeterminate
            color="primary"
            class="uploading-indicator"
          />
          <EgovIconButton
            v-else
            icon="ri-close-line"
            ariaLabel="Remove file"
            variant="text"
            class="close-icon"
            size="16"
            tabindex="0"
            @click="removeFile(file.id)"
          />
          <div v-if="file.error" class="error-message">
            <v-icon aria-label="error icon" icon="ri-error-warning-line" size="16" class="error-icon" />
            <span>{{ file.error }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Drag-and-Drop Variant -->
    <div v-else class="drag-drop-container" :class="{ 'disabled-state': disabled }">
      <v-file-input
        ref="fileInput"
        v-model="selectedFiles"
        :accept="acceptedTypes"
        :disabled="disabled"
        multiple
        hide-details
        class="drag-drop-file-input"
        prepend-icon=""
        @update:modelValue="handleFileChange"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <template #selection>
          <!-- Hide default selection display -->
        </template>
        <template #prepend-inner>
          <div class="drop-zone-content d-flex align-center justify-center">
            <div class="upload-icon-wrapper mr-3">
              <v-icon icon="ri-file-upload-line" aria-label="Upload file" class="upload-icon" size="48" />
            </div>
            <p class="drag-drop-text">
              Drag and drop files here or
              <span class="upload-link">Click to Upload</span>
            </p>
          </div>
        </template>
      </v-file-input>

      <!-- File List -->
      <div v-if="computedFiles.length > 0" class="file-list">
        <div
          v-for="file in computedFiles"
          :key="file.id"
          class="file-item"
          :class="{ 'error-state': file.error }"
        >
          <span class="file-name">{{ file.name }}</span>
          <v-progress-circular
            v-if="file.status === 'uploading'"
            size="16"
            width="2"
            indeterminate
            color="primary"
            class="uploading-indicator"
          />
          <EgovIconButton
            v-else
            icon="ri-close-line"
            ariaLabel="Remove file"
            variant="text"
            class="close-icon"
            size="16"
            tabindex="0"
            @click="removeFile(file.id)"
          />
          <div v-if="file.error" class="error-message">
            <v-icon aria-label="error icon" icon="ri-error-warning-line" size="16" class="error-icon" />
            <span>{{ file.error }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import EgovIconButton from '../EgovIconButton/EgovIconButton.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Upload files',
  },
  helperText: {
    type: String,
    default: 'Max file size is 1MB. Supported file types are .jpg and .png.',
  },
  variant: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'drag-drop'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxFileSize: {
    type: Number,
    default: 1 * 1024 * 1024, // 1MB in bytes
  },
  acceptedTypes: {
    type: String,
    default: 'image/jpeg,image/png',
  },
})

const emit = defineEmits(['update:files', 'change'])
const fileUploadInput = ref(`fileUploadInput-${uuidv4()}`)
const fileInput = ref(null)

const selectedFiles = ref([])
const computedFiles = ref([])
const isDragging = ref(false)

const handleFileChange = (files) => {
  if (!files || files.length === 0) return

  const newFiles = files.map((file) => {
    let error = null
    let status = 'default'

    // Check file size
    if (file.size > props.maxFileSize) {
      error = 'File exceeds size limit'
      status = 'error'
    }

    // Check file type
    const acceptedTypesArray = props.acceptedTypes.split(',')
    if (!acceptedTypesArray.includes(file.type)) {
      error = 'File type is unsupported'
      status = 'error'
    }

    return { id: uuidv4(), name: file.name, file, status, error }
  })

  computedFiles.value = [...computedFiles.value, ...newFiles]
  emit('update:files', computedFiles.value)
  emit('change', computedFiles.value)

  // Simulate uploading state
  newFiles.forEach((fileObj) => {
    if (!fileObj.error) {
      fileObj.status = 'uploading'
      setTimeout(() => {
        fileObj.status = 'default'
        computedFiles.value = [...computedFiles.value] // Trigger reactivity
      }, 2000)
    }
  })
}

const handleDragOver = (event) => {
  event.preventDefault()
  // Add visual feedback by focusing the field
  if (fileInput.value?.$el) {
    fileInput.value.$el.querySelector('.v-field').classList.add('v-field--focused')
  }
}

const handleDragLeave = (event) => {
  event.preventDefault()
  // Remove visual feedback
  if (fileInput.value?.$el && !event.currentTarget.contains(event.relatedTarget)) {
    fileInput.value.$el.querySelector('.v-field').classList.remove('v-field--focused')
  }
}

const handleDrop = (event) => {
  event.preventDefault()
  // Remove visual feedback
  if (fileInput.value?.$el) {
    fileInput.value.$el.querySelector('.v-field').classList.remove('v-field--focused')
  }
  const files = Array.from(event.dataTransfer.files)
  selectedFiles.value = files
  handleFileChange(files)
}

const triggerFileInput = () => {
  if (!props.disabled && fileInput.value) {
    const input = fileInput.value.$el?.querySelector('input[type="file"]')
    if (input) {
      input.click()
    }
  }
}

const removeFile = (id) => {
  computedFiles.value = computedFiles.value.filter((file) => file.id !== id)
  // Update selectedFiles to maintain sync
  const remainingFiles = computedFiles.value.map(file => file.file)
  selectedFiles.value = remainingFiles
  emit('update:files', computedFiles.value)
  emit('change', computedFiles.value)
}
</script>

<style scoped lang="scss">
.egov-file-upload {
  background: #f7faff;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Roboto', sans-serif;

  .title-wrapper {
    margin-bottom: 4px;

    .upload-label {
      font-size: 14px;
      font-weight: 600;
      color: #001849;
    }
  }

  .helper-text-wrapper {
    margin-bottom: 12px;

    .helper-text {
      font-size: 12px;
      color: #616161;
    }
  }

  /* Custom File Input for Button Variant */
  .custom-file-input {
    width: 15rem;
    
    :deep(.v-field) {
      background-color: transparent !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
    }
    
    :deep(.v-field__input) {
      padding: 0 !important;
      min-height: 40px !important;
      cursor: pointer;
    }
    
    :deep(.v-field__prepend-inner) {
      padding: 0 !important;
    }
    
    :deep(.v-input__details) {
      display: none;
    }
    
    :deep(.v-field__clearable) {
      display: none !important;
    }

    .custom-browse-btn {
      background-color: #00629e;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 4px;
      height: 40px;
      width: 15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border: none;
      box-shadow: none;
      
      &:hover:not(.disabled) {
        background-color: #004a7c;
      }
      
      &.disabled {
        background-color: #b0bec5;
        cursor: not-allowed;
        opacity: 0.7;
      }
      
      .browse-label {
        color: #ffffff !important;
        font-size: 14px;
        font-weight: 500;
        pointer-events: none;
      }
      
      .browse-icon {
        color: #ffffff !important;
        font-size: 16px;
        margin-left: 8px;
      }
    }
  }

  /* Drag-and-Drop Variant */
  .drag-drop-container {
    &.disabled-state {
      opacity: 0.5;
      pointer-events: none;
    }

    .drag-drop-file-input {
      :deep(.v-field) {
        border: 2px dashed #b0bec5 !important;
        border-radius: 4px !important;
        background: #fff !important;
        transition: all 0.2s ease !important;
        min-height: 200px !important;
        cursor: pointer !important;
        
        &:hover {
          border-color: #00629e !important;
          background: #f8f9fa !important;
        }
        
        &.v-field--focused {
          border-color: #00629e !important;
          background: #e3f2fd !important;
        }
      }
      
      :deep(.v-field__input) {
        padding: 32px !important;
        min-height: 200px !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      :deep(.v-field__prepend-inner) {
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      :deep(.v-input__details) {
        display: none;
      }
      
      :deep(.v-field__clearable) {
        display: none !important;
      }

      .drop-zone-content {
        width: 100%;
        height: 100%;
        pointer-events: none;
        
        .upload-icon-wrapper {
          .upload-icon {
            color: #00629e;
          }
        }

        .drag-drop-text {
          font-size: 14px;
          color: #001849;
          margin: 0;

          .upload-link {
            color: #00629e;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  /* File List */
  .file-list {
    margin-top: 12px;

    .file-item {
      display: flex;
      align-items: center;
      background: #e3f2fd;
      border-radius: 4px;
      padding: 8px;
      margin-bottom: 8px;

      &.error-state {
        background: #ffebee;

        .file-name {
          color: #d32f2f;
        }
      }

      .file-name {
        flex: 1;
        font-size: 14px;
        color: #001849;
        word-break: break-all;
      }

      .uploading-indicator {
        margin-right: 8px;
      }

      .close-icon {
        cursor: pointer;
        color: #616161;

        &:hover {
          color: #d32f2f;
        }
      }

      .error-message {
        display: flex;
        align-items: center;
        margin-top: 4px;
        font-size: 12px;
        color: #d32f2f;

        .error-icon {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>