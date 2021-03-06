import { ComboboxInput } from './ComboboxInput';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Menu, MenuItem, MenuList } from '../Menu/Menu';

describe('<ComboboxInput />', () => {
    const defaultMenu = (
        <Menu>
            <MenuList>
                <MenuItem url='/'>Pear</MenuItem>
                <MenuItem url='/'>Strawberry</MenuItem>
                <MenuItem url='/'>Raspberry</MenuItem>
                <MenuItem isLink url='/'>
                    + New Item
                </MenuItem>
            </MenuList>
        </Menu>
    );

    const defaultComboBoxInput = (
        <ComboboxInput
            menu={defaultMenu}
            placeholder='Select Fruit' />
    );

    const compactComboBoxInput = (
        <ComboboxInput
            className='blue'
            compact
            menu={defaultMenu}
            placeholder='Select Fruit' />
    );

    test('create combobox input', () => {
        // default combobox
        let component = renderer.create(defaultComboBoxInput);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // compact combobox
        component = renderer.create(compactComboBoxInput);
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the ComboboxInput component', () => {
            const element = mount(<ComboboxInput data-sample='Sample' menu={defaultMenu} />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ComboboxInput component\'s Popover component', () => {
            const element = mount(<ComboboxInput menu={defaultMenu} popoverProps={{ 'data-sample': 'Sample' }} />);

            expect(
                element.find('div.fd-popover').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ComboboxInput component\'s input element', () => {
            const element = mount(<ComboboxInput inputProps={{ 'data-sample': 'Sample' }} menu={defaultMenu} />);

            expect(
                element.find('input').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });

        test('should allow props to be spread to the ComboboxInput component\'s button element', () => {
            const element = mount(<ComboboxInput buttonProps={{ 'data-sample': 'Sample' }} menu={defaultMenu} />);

            expect(
                element.find('button.sap-icon--navigation-down-arrow').getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });
});
