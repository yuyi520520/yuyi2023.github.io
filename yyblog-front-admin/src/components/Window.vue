<template>
  <div class="window" 
       :style="{width:width+'px'}"
       v-if="show">
    <div class="title">
        <el-icon class="icon_back" :size="20" @click="close" ><Back /></el-icon>
    </div>
    <div class="body">
        <slot></slot>
    </div>
    <div>
        <template v-if="buttons&&buttons.length>0||showCancel">
          <div class="footer">
            <el-button link
                       @click="close" size="small">
              取消
            </el-button>
            <el-button v-for="btn in buttons"
                       :type="btn.type"
                       @click="btn.click"
                       :key="btn"
                       size="small">
              {{btn.text}}
            </el-button>
          </div>
        </template>
    </div>
  </div>
</template>

<script setup>
import{ref} from 'vue';
import{Back} from '@element-plus/icons-vue'
const width=window.innerWidth - 250;

const props = defineProps({
    show:{
        type:Boolean,
        default:false
    },
    buttons: {
      type: Array
    },
    showCancel: {
      type: Boolean,
      default: true,
    },

})
const emit = defineEmits(["close"]);
const close = () => {
    emit("close")
}
</script>

<style lang="scss">
.window{
    position:absolute;
    top:0px;
    left:10px;
    height: calc(100vh - 70px);
    background-color: white;
    z-index: 50;
    .title{
        padding: 5px 0px;
        height: 30px;
        .icon_back{
            cursor: pointer;
        }
    }
    .body{
        height: calc(100vh - 145px);
    }
    .footer{
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 5px 0px;
        text-align: center;
    }
}
</style>
