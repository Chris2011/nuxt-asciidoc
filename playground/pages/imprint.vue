<script setup>
const { data } = await useAsyncData("imprint", () =>
  queryContent("/imprint").findOne()
);
</script>

<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <div v-html="doc.body"></div>
    </ContentDoc>
  </main>
</template>
