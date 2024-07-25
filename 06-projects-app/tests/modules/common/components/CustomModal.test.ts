import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';

describe('<CustomModal/>', () => {
  test('should renders dialog with defult value ', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
    expect(wrapper.props().open).toBe(false);
  });

  test('should renders dialog with header, body and actions slots ', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<h1>Header content</h1>',
        body: '<p>Body content</p>',
        actions: '<button>Action content</button>',
      },
    });

    expect(wrapper.text()).toContain('Header content');
    expect(wrapper.text()).toContain('Body content');
    expect(wrapper.text()).toContain('Action content');
  });

  test('open and closes dialoig when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeDefined();

    // cambiar la prop
    await wrapper.setProps({ open: false });
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('should render the backdrop whe open is true', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const backdrop = wrapper.find('.backdrop-blur-sm');

    expect(backdrop.exists()).toBeTruthy();

    await wrapper.setProps({ open: false });

    expect(wrapper.find('.backdrop-blur-sm').exists()).toBeFalsy();
  });
});
