import FabButton from '@/modules/common/components/FabButton.vue';
import { shallowMount } from '@vue/test-utils';

describe('<FabButton/>', () => {
  test('should be render with default position', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.find('button').classes('bottom-right')).toBeTruthy();

    expect(wrapper.props().position).toContain('bottom-right');
  });

  test('should be render with the prop class position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    expect(wrapper.find('button').classes('top-left')).toBeTruthy();

    expect(wrapper.props().position).toContain('top-left');
  });

  test('renders slot content insede button', () => {
    const wrapper = shallowMount(FabButton,{
        slots: {
            default: '<span> hola </span>'
        }
    });

    const slotContent = wrapper.find('button span')

    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('hola');


  })
});
