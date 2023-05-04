import { beforeAll, describe, expect, it, vi } from 'vitest'

import FloatMyVue from '@/FloatMyVue.vue'
import { mount } from '@vue/test-utils'

let mockIndex = 0
let unobserveCalls = 0
class ResizeObserverMock {
  constructor(public callback: () => void, public unobserveCalls: 0) {}

  observe(element: HTMLElement | null) {
    if (!element) return
    vi.spyOn(element, 'clientHeight', 'get').mockImplementationOnce(() => ++mockIndex * 20)
    vi.spyOn(element, 'clientWidth', 'get').mockImplementationOnce(() => ++mockIndex * 20)
    this.callback()
  }
  unobserve() {
    unobserveCalls++
  }
  disconnect() {}
}

const getTranslateProperty = <T extends { find: (arg: string) => { element: HTMLElement } }>(
  wrapper: T,
  testId: string
) => getComputedStyle(wrapper.find(`[data-testid="${testId}"]`).element).transform

describe('Element used with basic config', () => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  it('renders reference element', () => {
    const wrapper = mount(FloatMyVue, {
      slots: { reference: 'ref', content: 'the content' }
    })
    expect(wrapper.text()).toContain('ref')
  })

  it('renders content element', async () => {
    const wrapper = mount(FloatMyVue, {
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    expect(wrapper.text()).not.toContain('the content')
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('the content')
  })

  it('hides content element', async () => {
    const wrapper = mount(FloatMyVue, {
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    expect(wrapper.text()).not.toContain('the content')
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('the content')
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).not.toContain('the content')
  })
})

describe('Element renders on other sides', () => {
  beforeAll(() => {
    mockIndex = 0
  })

  it('renders on the left', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { side: 'left' },
      slots: { reference: '<button>ref</button>', content: 'the content' },
      attachTo: document.body
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(-70px) translateY(-60px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(-10px) translateY(-30px)"'
    )
  })

  it('renders on the right', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { side: 'right' },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(110px) translateY(-140px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(90px) translateY(-70px)"'
    )
  })

  it('renders on the bottom', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { side: 'bottom' },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(-18px) translateY(10px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(82px) translateY(-10px)"'
    )
  })

  it('renders on the top', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { side: 'top' },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(-18px) translateY(-609px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(122px) translateY(-290px)"'
    )
  })
})

describe('Element renders with offsets', () => {
  beforeAll(() => {
    mockIndex = 0
  })

  it('x: 500, y: 500', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { offset: { x: 500, y: 500 } },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(-518px) translateY(-629px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(-498px) translateY(-550px)"'
    )
  })

  it('x: -500, y: 500', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { offset: { x: -500, y: 500 } },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(482px) translateY(-789px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(542px) translateY(-630px)"'
    )
  })

  it('x: 500, y: -500', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { offset: { x: 500, y: -500 } },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(-518px) translateY(51px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(-418px) translateY(290px)"'
    )
  })

  it('x: -500, y: -500', async () => {
    const wrapper = mount(FloatMyVue, {
      props: { offset: { x: -500, y: -500 } },
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    expect(getTranslateProperty(wrapper, 'tooltip-translate')).toMatchInlineSnapshot(
      '"translateX(482px) translateY(-109px)"'
    )
    expect(getTranslateProperty(wrapper, 'arrow-translate')).toMatchInlineSnapshot(
      '"translateX(622px) translateY(210px)"'
    )
  })
})

describe('The open prop', () => {
  describe("when the component first loads and it's true", () => {
    it('renders open', async () => {
      const wrapper = mount(FloatMyVue, {
        props: { open: true },
        slots: { reference: '<button>ref</button>', content: 'the content' }
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain('the content')
    })
  })

  describe('when the value changes', () => {
    it('changes accordingly', async () => {
      const wrapper = mount(FloatMyVue, {
        props: { open: false },
        slots: { reference: '<button>ref</button>', content: 'the content' }
      })
      await wrapper.setProps({ open: true })
      expect(wrapper.text()).toContain('the content')
      await wrapper.setProps({ open: false })
      expect(wrapper.text()).not.toContain('the content')
    })
  })
})

describe('Advanced slots', () => {
  describe('when the arrow slot is used', () => {
    it('should render that instead of the default arrow', async () => {
      const wrapper = mount(FloatMyVue, {
        props: { open: true },
        slots: { reference: '<button>ref</button>', content: 'the content', arrow: 'an-arrow' }
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-testid="arrow-default"]').exists()).toBe(false)
      expect(wrapper.text()).toContain('an-arrow')
    })
  })

  describe('when the float slot is used', () => {
    it('should render that instead of the default float', async () => {
      const wrapper = mount(FloatMyVue, {
        props: { open: true },
        slots: { reference: '<button>ref</button>', float: "<p>i'm floating!</p>" }
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-testid="tooltip-default"]').exists()).toBe(false)
      expect(wrapper.text()).toContain("i'm floating!")
    })
  })
})

describe('Corner cases', () => {
  it('removes observers on unmount', async () => {
    const wrapper = mount(FloatMyVue, {
      slots: { reference: '<button>ref</button>', content: 'the content' }
    })
    await wrapper.find('button').trigger('click')
    unobserveCalls = 0
    await wrapper.unmount()
    expect(unobserveCalls).toBe(2)
  })
})
