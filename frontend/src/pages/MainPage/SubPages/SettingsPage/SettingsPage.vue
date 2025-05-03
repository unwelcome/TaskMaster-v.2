<template>
    <div>
        <inputText
            :inp-type="'password'"
            :inp-title="'My input'"
            :inp-placeholder="'Enter message...'"
            :inp-default-value="''"
            :inp-description="'* Description tell what this input about'"
            :inp-show-description="true"
            :inp-error="'Error! wrong data!'"
            :inp-show-error="true"
        />
    </div>
</template>
<script lang="ts">

import inputText from '@/lib/customInput/inputText.vue';

export default {
    components:{
        inputText,
    }
}
</script>