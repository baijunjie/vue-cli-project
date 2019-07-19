import Vue from 'vue'

const permissions = {
  code: [ 'ROLE_MERCHANT_ADMIN', 'ROLE_MERCHANT_DEVELOPER', 'ROLE_MERCHANT_ANALYST', 'ROLE_MERCHANT_SUPPORT_SPECIALIST', 'ROLE_MERCHANT_VIEW_ONLY' ],
  map: {
    'business-apps': [ 1, 1, 1, 1, 1 ],
    'business-merchant': [ 1, 0, 0, 0, 0 ],
    'business-merchant-user': [ 1, 0, 0, 0, 0 ],
    'gw': [ 1, 1, 1, 1, 1 ],
    'gw__dashboard': [ 1, 1, 1, 1, 1 ],
    'gw__payment': [ 1, 1, 1, 1, 1 ],
    'gw__payment__charge-list': [ 1, 1, 1, 1, 1 ],
    'gw__payment__charge-detail': [ 1, 1, 1, 1, 1 ],
    'gw__payment__charge-refund': [ 1, 0, 0, 1, 0 ],
    'gw__payment__payment-methods': [ 1, 1, 1, 0, 1 ],
    'gw__developer': [ 1, 1, 0, 0, 0 ],
    'gw__developer__api': [ 1, 1, 0, 0, 0 ],
    'gw__developer__webhooks': [ 1, 1, 0, 0, 0 ],
    'gw__developer__app-setting': [ 1, 1, 0, 0, 0 ],
    'gw__developer__applepay': [ 1, 1, 0, 0, 0 ],
    'billing': [ 1, 1, 1, 0, 0 ],
    'billing__invoice-list': [ 1, 1, 1, 0, 0 ],
    'billing__invoice-detail': [ 1, 1, 1, 0, 0 ],
    'oneqr': [ 1, 1, 1, 1, 1 ],
    'oneqr__dashboard': [ 1, 1, 1, 1, 1 ],
    'oneqr__shop': [ 1, 1, 1, 0, 1 ],
    'oneqr__shop-list': [ 1, 1, 1, 0, 1 ],
    'oneqr__shop-detail': [ 1, 1, 1, 0, 1 ],
    'oneqr__shop-create': [ 1, 1, 0, 0, 0 ],
    'oneqr__shop-update': [ 1, 1, 0, 0, 0 ],
    'oneqr__shop-setting__product': [ 1, 1, 0, 0, 0 ],
    'oneqr__shop-setting__stock-and-expiry-time': [ 1, 1, 0, 0, 0 ],
    'oneqr__shop-setting__info': [ 1, 1, 0, 0, 0 ],
    'oneqr__shop-setting__payment-methods': [ 1, 1, 0, 0, 0 ],
    'oneqr__product': [ 1, 1, 1, 0, 1 ],
    'oneqr__product-list': [ 1, 1, 1, 0, 1 ],
    'oneqr__product-detail': [ 1, 1, 1, 0, 1 ],
    'oneqr__product-create': [ 1, 1, 0, 0, 0 ],
    'oneqr__product-update': [ 1, 1, 0, 0, 0 ],
    'oneqr__order': [ 1, 1, 1, 1, 1 ],
    'oneqr__order-list': [ 1, 1, 1, 1, 1 ],
    'oneqr__order-detail': [ 1, 1, 1, 1, 1 ],
    'oneqr__order-refund': [ 1, 0, 0, 1, 0 ],
    'oneqr__user': [ 1, 1, 1, 1, 1 ],
    'oneqr__user-list': [ 1, 1, 1, 1, 1 ],
    'oneqr__user-detail': [ 1, 1, 1, 1, 1 ],
    'oneqr__campaign': [ 1, 1, 1, 0, 1 ],
    'oneqr__campaign-list': [ 1, 1, 1, 0, 1 ],
    'oneqr__campaign-detail': [ 1, 1, 1, 0, 1 ],
    'oneqr__campaign-create': [ 1, 1, 0, 0, 0 ],
    'oneqr__campaign-update': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__basic': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__stock-and-expiry-time': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__design': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__categories': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__custom-domain': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__payment-methods': [ 1, 1, 0, 0, 0 ],
    'oneqr__setting__transaction-law': [ 1, 1, 0, 0, 0 ]
  }
}

let permissionMap = {}

export function createPermissionsMap (role) {
  const index = permissions.code.indexOf(role)
  if (index < 0) return {}
  permissionMap = {}
  for (const [ key, arr ] of Object.entries(permissions.map)) {
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
 *    <button v-action:add >添加用户</button>
 *    <button v-action:delete>删除用户</button>
 *    <button v-action:edit @click="edit(record)">修改</button>
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
