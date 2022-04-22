import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BioData from '../BioData.vue'

describe('BioData', () => {
  it('renders properly', () => {
    const wrapper = mount(BioData, {
      props: {
        profile: {
          name: 'John Doe',
          placeBorn: 'New York, NY',
          bornDate: '01/01/1990',
          age: '28',
          lastEducation: 'B.Sc. Computer Science',
        }
      }
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('New York, NY')
    expect(wrapper.text()).toContain('01/01/1990')
    expect(wrapper.text()).toContain('28')
    expect(wrapper.text()).toContain('B.Sc. Computer Science')
  })
})
