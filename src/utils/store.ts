import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * 手写mapGetters
 * **/
const mapGetters = (namespaced?: string) => {
  const store = useStore()
  const arr = Object.keys(store.getters).filter((item) => {
    return item.includes(`${namespaced}/`)
  })
  return Object.fromEntries(
    arr.map((getter) => [
      getter.replace(`${namespaced}/`, ''),
      computed(() => store.getters[getter])
    ])
  )
}

export { mapGetters }
