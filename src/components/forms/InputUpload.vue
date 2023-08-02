<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router';
import { reset } from '@formkit/vue';
const route = useRoute()

const uploadHandler = inject('uploadHandler')
const loading = ref(false)


const getExtension = (name) => {
    return name.slice(name.lastIndexOf('.') + 1);
}
const getCurrentDateString = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(/[/.,\s:]/g, '');
}
const createFileUploadRequest = (file, ext) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = new Uint8Array(event.target.result);
            const fileName = `${route.name.toString()}_${getCurrentDateString()}.${ext}`
            resolve({ fileName, fileData });
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsArrayBuffer(file);
    });
}

async function handleInput(data) {
    if (typeof data[0] == 'undefined') return
    loading.value = true
    const req = await createFileUploadRequest(data[0].file, getExtension(data[0].name))
    uploadHandler.fileUpload(req).then((res) => {
        props.context._value = res.fileName
        props.context.node.input(res.fileName)
        loading.value = false
    })

}


const handleFileRemove = async () => {
    if (!props.context._value || props.context._value == "") return
    loading.value = true
    await uploadHandler.fileRemove({ fileName: props.context._value })
    props.context._value = ""
    props.context.node.input(props.context._value)
    loading.value = false
    reset('file-input')


}
const props = defineProps({
    context: Object,
})

</script>

<template>
    {{ baseImage }}
    <div class="upload" :class="{ 'disabled': loading }">
        <div class="loader" v-if="loading">
            <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 30 10" enable-background="new 0 0 0 0" xml:space="preserve">
                <rect x="14" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="18" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="22" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div>
        <div v-if="props.context._value && props.context._value.length > 0" class="img-wrapper"
            @click.prevent="handleFileRemove">
            <img class="uploaded-img" :src="`${uploadHandler.baseImageUrl}${props.context._value}`"
                :alt="props.context._value" />
            <div class="remove">
                <i class="pi pi-trash"></i>
                {{ $t('remove') }}
            </div>
        </div>
        <FormKit id="file-input" @input="handleInput" type="file" name="image" accept=".jpg,.png,.webp,.jpeg" />
    </div>
</template>

