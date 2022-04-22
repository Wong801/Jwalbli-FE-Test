import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CommentComponent from '../CommentComponent.vue'
import { createTestingPinia } from '@pinia/testing'

describe('CommentComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(CommentComponent, {
      global: {
        plugins: [createTestingPinia({ createSpy: () => { } })]
      },
      props: {
        comment: {
          postId: 1,
          id: 1,
          name: 'John Doe',
          email: 'John_Doe@example.com',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        }
      }
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('John_Doe@example.com')
    expect(wrapper.text()).toContain('Lorem ipsum dolor sit amet')
    expect(wrapper.text()).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  })
})
