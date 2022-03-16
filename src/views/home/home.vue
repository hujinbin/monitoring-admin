<template>
    <div class="home-box">
        <div class="title">简洁/实用<span>vue3.0+ts</span> 现成模板</div>
        <div ><router-link class="go-contact" to="/contact">点击获取源码</router-link> </div>
        <icons name="index" class="theme-all" className="icon-svg"></icons>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
<style lang="scss" scoped >
    .home-box{
        text-align: center;
       .title{
           font-size: 40px;
           font-weight: 600;
           margin: 50px 0 30px;
           span{
               color: red;
           }
       }
       .go-contact{
            color: rgb(0, 89, 255);
            font-size: 24px;
            margin-bottom: 30px;
            display: block;
       }
       
    }
    @keyframes icon-svg{
        0%{
            opacity: 0.5;
        }
        50%{
           opacity: 1;
        }
        100%{
           opacity: 0.5;
        }
    }
    .icon-svg{
        width: 40rem;
        height: 40rem;
        border-radius: 50%;
        animation: icon-svg 10s infinite;
    }
</style>
