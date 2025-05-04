<template>
    <div class="flex flex-col gap-2 items-start">
        <inputText 
            :inp-type="'text'" 
            :inp-title="'My input'" 
            :inp-placeholder="'Enter message...'"
            :inp-show-description="true" 
            :inp-show-error="true" 
        />

        <inputNumber 
            :inp-title="'My number input'" 
            :inp-placeholder="'Enter message...'" 
            :inp-default-value="null"
            :inp-min-value="10" 
            :inp-max-value="20" 
            :inp-hide-btns="true"
        />

        <inputSwitch :inp-title="'My switch input'"/>

        <iconButton class="btn-main" @click="addApproveWindow">
            <template #text>
                <p>Add aprrove window</p>
            </template>
        </iconButton>
    </div>
</template>
<script lang="ts">

import { useApproveWindowAPI } from '@/lib/ApproveWindow/approveWindowAPI';
import IconButton from '@/shared/iconButton.vue';

export default {
    data() {
        return {
            ApproveWindowAPI: useApproveWindowAPI(),

            ind: 4,
        }
    },
    mounted() {
        this.ApproveWindowAPI.createApproveWindow('Test Approve Window 1!', [
            {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'good'},
            {id: 2, type: this.ApproveWindowAPI.getApproveWindowAnswerType.bad, text: 'bad'},
            // {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'good'},
        ]).then((id: number) => {
            console.log('RESOLVE: ', id);
        }).catch(err => {
            console.error(err);
        }).finally(() => {
            console.log('promise end');
        });

        
        this.ApproveWindowAPI.createApproveWindow('Test Approve Window 2!', [
            {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.normal, text: 'main'},
            {id: 2, type: this.ApproveWindowAPI.getApproveWindowAnswerType.bad, text: 'bad'},
        ]);
        this.ApproveWindowAPI.createApproveWindow('Delete operation system!', [
            {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'Yes'},
            {id: 2, type: this.ApproveWindowAPI.getApproveWindowAnswerType.bad, text: 'No'},
        ]);
    },
    methods: {
        addApproveWindow(){
            this.ApproveWindowAPI.createApproveWindow(`Approve Window #${this.ind++}`, [
                {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'Yes'},
                {id: 2, type: this.ApproveWindowAPI.getApproveWindowAnswerType.bad, text: 'No'},
            ]);
        }
    }
}
</script>