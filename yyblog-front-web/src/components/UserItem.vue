<template>
    <div class="u_item">
      <div class="up">
        <div class="cover">
          <img :src="proxy.globalInfo.imageUrl+cover"
              v-if="cover">
          <img v-else
              src="../assets/default_img.png">
        </div>
        <div class="info">
            <div class="name">
                <router-link  to="/user" class="a-link">{{ name }}</router-link>
            </div>
            <div class="profession">
                {{ profession }}
            </div>
        </div>
      </div>
      <div class="down">
        <div class="count">累计发表博客共{{ count }}篇</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getCurrentInstance } from "vue"
  
  const {proxy} = getCurrentInstance();
  const props = defineProps({
      cover:{
          type:String,
      },
      name:{
          type:String,
      },
      count:{
          type:Number,
          default:0,
      },
      profession:{
          type:String,
          default:null,
      },
  })
  </script>
  
  <style lang="scss">
  .u_item{
      .up{
        display: flex;
        align-items: center;
        margin: 5px;
        justify-content: space-between;
        .cover {
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
            overflow: hidden;

            border-radius: 50%;
            border: 1px solid #ddd;

            img {
                width: 100%;
                height:100%;
            }
        }
        .info{
            display: flex;
            flex-direction: column;
            align-items: center;
            .name{
                font-size:20px;
                font-style: italic;
                font-weight: bold;
                margin:0px 15px 10px 0px;
                .a-link{
                    color: rgb(108, 185, 137);
                }
            }
            .profession{
                font-size:15px;
                color:#5b6152;
                margin:0px 15px 0px 0px;
            }
        }
      }
      .down{
        display: flex;
        justify-content: right;
        .count{
            width:140px;
            font-size: 13px;
            color:#5b6152;
        }
      }
      
  }
  </style>
  