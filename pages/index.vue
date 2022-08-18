<template>
  <LayoutMain>
    <AppButton @click="fetch">Fetch</AppButton>

    <AppButton @click="update">Update</AppButton>
    <AppButton @click="deletePost">delete</AppButton>
    <img :src="path" />
    <o-upload v-model="file">
      <o-button tag="a" variant="primary">
        <o-icon icon="upload"></o-icon>
        <span>Click to upload</span>
      </o-button>
    </o-upload>
  </LayoutMain>
</template>

<script setup lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import axios from "axios"

const file = ref(null)
const path = ref(null)

onMounted(async () => {
  const resp = await axios.get("/feed/posts?page=1&perPage=2")
  console.log(resp)
})

const deletePost = async () => {
  axios.delete("/feed/post/62ee6ee022a038cc86d90efd")
}

const update = async () => {
  const content = "This is the second post!"
  const imageUrl = file.value

  const formData = new FormData()
  formData.append("file", imageUrl)
  formData.append("title", "sracka")
  formData.append("content", content)
  const post = await axios.put("/feed/post/62ee6ee022a038cc86d90efd", formData)
}

const fetch = async () => {
  const formData = new FormData()

  const title = "Testa"
  const content = "This is the second post!"
  const imageUrl = file.value

  formData.append("file", imageUrl)
  formData.append("title", title)
  formData.append("content", content)

  const post = await axios.post("/feed/post", formData)

  const resp = await axios.get("/feed/posts")
  path.value = "./images/" + "10.png"
  console.log(path.value)
}
</script>
