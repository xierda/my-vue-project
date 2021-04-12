export default {
  inserted (el, binding, vnode) {
    // console.log(binding.value)
    let btnPermissionValue = binding.value
    let btnBoolean = vnode.context.$store.state.buttonPermission[btnPermissionValue]
    !btnBoolean && el.parentNode.removeChild(el)
  }
}