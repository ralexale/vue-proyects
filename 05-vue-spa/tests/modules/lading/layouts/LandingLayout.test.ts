import { shallowMount } from '@vue/test-utils';
import LandingLayout from '@/modules/lading/layouts/LandingLayout.vue';

describe('<LandingLayout/>', () => {
  test('should be render correctly', () => {
    const wrapper = shallowMount(LandingLayout);
  });
});
