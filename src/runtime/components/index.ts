import { getIcon as _getIcon } from '@iconify/vue'
import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import type { NuxtIconRuntimeOptions } from '../../types'
import { NuxtIconCss } from './css'
import { NuxtIconSvg } from './svg'
import { useResolvedName } from './shared'
import { useAppConfig, useNuxtApp } from '#imports'

export default defineComponent({
  name: 'NuxtIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String as PropType<'svg' | 'css'>,
      required: false,
      default: null,
    },
    size: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },
  async setup(props, { slots }) {
    const nuxtApp = useNuxtApp()
    const options = useAppConfig().nuxtIcon as NuxtIconRuntimeOptions
    const name = useResolvedName(() => props.name)
    const component = computed(() =>
      nuxtApp.vueApp?.component(name.value)
      || ((props.mode || options.defaultMode) === 'svg'
        ? NuxtIconSvg
        : NuxtIconCss),
    )
    const style = computed(() => {
      const size = props.size
      return size
        ? { fontSize: Number.isNaN(+size) ? size : size + 'px' }
        : null
    })

    return () => h(
      component.value,
      {
        name: name.value,
        class: options.class,
        style: style.value,
      },
      slots,
    )
  },
})
