<template>
  <div class="card">
    <h2 class="card-title">{{ title }}</h2>
    <div class="card-content">
      <slot></slot>
    </div>
    <p v-if="description" class="card-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Card title
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Card description
     */
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
