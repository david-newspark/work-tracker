
<script setup lang="ts">
import type { ILayout, ILayoutContent, ILayoutFooter } from '@inkline/inkline';

</script>
<template>
    <ILayout>
        <ILayoutContent>
            <div>Main Layout...</div>
            <router-view />
        </ILayoutContent>
        <ILayoutFooter>
            Footer
        </ILayoutFooter>
    </ILayout>
</template>