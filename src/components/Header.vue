<template>
  <div class="header-main">
    <div class="app-container header-box">
      <!-- 左边导航 -->
      <div class="header-left">
        <router-link to="/">
          <img src="../assets/logo-2.png" alt="" srcset="">
        </router-link>
        <ul class="header-nav app-hide-xs">
          <li class="header-nav-item"><a href="javascript:;"><i class="iconfont icon-jiaoliu" />交流</a></li>
          <li class="header-nav-item"><a href="javascript:;"><i class="iconfont icon-iconmingxinganli" />案例</a></li>
          <li class="header-nav-item"><a href="javascript:;"><i class="iconfont icon-ui" />框架</a></li>
        </ul>
      </div>
      <!-- 右边导航 -->
      <div class="header-right">
        <ul class="header-nav">
          <li class="header-nav-item"><a class="avatar app-hide-xs" href="javascript:;"><i class="iconfont icon-touxiang" /></a></li>
          <li class="header-nav-item"><router-link class="login" to="/login">登录</router-link></li>
          <li class="header-nav-item"><a class="register" href="javascript:;">注册</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header-main{
  background-color: #393D49;
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid #404553;
  border-right: 1px solid #404553;
  border-radius: 0;
  .header-box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .header-left{
      display: flex;
      align-items: center;
    }
    .header-right{
      .header-nav{
        .header-nav-item{
          .login, .register{
            padding: 0 25px 0 0;
          }
          .avatar{
            i{
              font-size: 32px;
            }
          }
        }
      }
    }
    // 导航公共样式
    .header-nav{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      .header-nav-item{
        a{
          padding: 0 25px 0 60px;
          display: block;
          height: 60px;
          line-height: 60px;
          color: rgba(255,255,255,.7);
          font-size: 14px;
          position: relative;
          &:hover{
            color: #fff;
          }
          i{
            position: absolute;
            left: 25px;
            padding-right: 10px;
            font-size: 26px;
            &:hover{
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
