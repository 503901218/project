
<template>
    <el-container>
        <el-header>
            <titleHeader>21</titleHeader>
            <!-- <div class="logo">
               <img src="../../assets/img/logo.png" alt="">
            </div> -->
        </el-header>
        <titleright></titleright>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import 'element-plus/lib/theme-chalk/display.css';

import titleheader from './header.vue';
import titleright from './titleright'

// @import url("//unpkg.com/element-plus/lib/theme-chalk/index.css");
  export default {

    data: () => ({
      show2: true
    }),
    components(){
        titleheader,
        titleright
    }
  }

//   var allContainer=document.getElementById("allContainer") // eslint-disable-line no-unused-vars
 
//   allContainer.offsetHeight=window.innerHeight
</script>


<style>
.el-container{
    height: 800px;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 80px;

     display: flex;
}
.el-header{
   height: 80px!important;
}

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
/*     line-height: 200px; */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }


/* header */
.logo{
  float: left;
  display: flex;
 

}
.logo img{
  padding: 8px 10px;
  align-items: center;
}

/* 
 .el-row {
    margin-bottom: 1px;
 
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  } */
</style>
