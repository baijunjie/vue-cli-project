import Vue from 'vue'

const permission = {
  roles: [ 'ROLE_MERCHANT_ADMIN', 'ROLE_MERCHANT_DEVELOPER', 'ROLE_MERCHANT_ANALYST', 'ROLE_MERCHANT_SUPPORT_SPECIALIST', 'ROLE_MERCHANT_VIEW_ONLY' ],
  map: {
    'business': [ 1, 1, 1, 1, 1 ],
    'business__create': [ 1, 0, 0, 0, 0 ],
    'business__update': [ 1, 0, 0, 0, 0 ]
  }
}

let permissionMap = {}

export function generatePermissionsMap (role) {
  const index = permission.roles.indexOf(role)
  if (index < 0) return {}
  permissionMap = {}
  for (const [ key, arr ] of Object.entries(permission.map)) {
    permissionMap[key] = !!arr[index]
  }
  return permissionMap
}

export function perm (permissionName) {
  return permissionMap[permissionName]
}

/**
 * perm 权限指令
 * 指令用法：
 *  - 在需要控制权限的组件上使用 v-perm:[permissionName] , 如下：
 *    <button v-perm:add >添加用户</button>
 *    <button v-perm:delete>删除用户</button>
 *    <button v-perm:edit @click="edit(record)">修改</button>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 */
Vue.directive('perm', function (el, binding, vnode) {
  const permissionName = binding.arg
  const { attr, className, disabled, readonly } = binding.modifiers
  if (permissionMap[permissionName]) return

  if (disabled || readonly) {
    if (attr) {
      if (disabled) el.setAttribute('disabled', 'disabled')
      if (readonly) el.setAttribute('readonly', 'readonly')
    }

    if (className || !attr) {
      if (disabled) el.classList.add('disabled')
      if (readonly) el.classList.add('readonly')
    }
  } else {
    el.parentNode ? el.parentNode.removeChild(el) : (el.style.display = 'none')
  }
})
