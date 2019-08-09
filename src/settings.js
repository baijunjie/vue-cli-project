module.exports = {
  name: 'Sys Admin',
  site: 'https://elestyle.jp/',
  permission: {
    roles: [ 'ROLE_ADMIN', 'ROLE_DEVELOPER', 'ROLE_ANALYST', 'ROLE_SUPPORT_SPECIALIST', 'ROLE_VIEW_ONLY' ],
    map: {
      'admin__demo_read': [ 1, 1, 1, 1, 1 ]
    }
  }
}
