<template>
  <div>
    <div class="header">
      <div class="header-item header-left">
        <nuxt-link class="header-link" to="/">
          <i class="fas fa-compass fa-3x" />
        </nuxt-link>
      </div>
      <div class="header-item header-middle">
        <nuxt-link class="header-link" to="/">
          <i class="header-icon fas fa-list" />
          <span class="header-icon-description">Activity</span>
        </nuxt-link>
        <nuxt-link class="header-link" to="/todos">
          <i class="header-icon far fa-check-circle"></i>
          <span class="header-icon-description">Todos</span>
        </nuxt-link>
        <nuxt-link class="header-link" to="/calendar">
          <i class="header-icon far fa-calendar"></i>
          <span class="header-icon-description">Calendar</span>
        </nuxt-link>
      </div>
      <div class="header-item header-right">
        <nuxt-link class="header-link" to="/profile">
          <img class="header-avatar" src="https://randomuser.me/api/portraits/men/83.jpg" alt="Avatar" />
        </nuxt-link>
      </div>
    </div>
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  height: 50px;
  line-height: 50px;
}
.header-item {
  width: 100%;
}
.header-icon-description {
  margin-left: 5px;
}
.content {
  margin: auto;
  width: 80%;
}
@media only screen and (max-width: 600px) {
  .header-icon {
    font-size: 24px;
  }
  .header-icon-description {
    display: none;
  }
  .content {
    width: 90%;
  }
}
.header-left {
  text-align: left;
  color: #4ecdc4;
}
.header-middle {
  text-align: center;
  width: 350%;
}
.header-right {
  text-align: right;
}
.header-img {
  width: 32px;
}
.header-link {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}
.header-link:not(:last-child) {
  margin-right: 20px;
}
.header-avatar {
  vertical-align: middle;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #191919;
}
</style>