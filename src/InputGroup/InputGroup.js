import classnames from 'classnames';
import PropTypes from 'prop-types';
import { INPUT_GROUP_ADDON_POSITIONS, INPUT_GROUP_TYPES } from '../utils/constants';
import React, { Component } from 'react';

export const FormGroup = ({ children, ...props }) => {
    return <div {...props} className='fd-form__group'>{children}</div>;
};
FormGroup.displayName = 'FormGroup';

FormGroup.propTypes = {
    children: PropTypes.node
};

export class InputGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.inputValue,
            searchValue: this.props.inputValue
        };
    }

    handleUp = e => {
        e.preventDefault();
        this.setState({
            value: this.state.value + 1
        });
    };

    handleDown = e => {
        e.preventDefault();
        this.setState({
            value: this.state.value - 1
        });
    };

    handleClear = e => {
        e.preventDefault();
        this.setState({
            searchValue: ''
        });
    };

    handleChange = e => {
        e.preventDefault();
        this.setState({
            searchValue: e.target.value
        });
    };

    handleTextChange = e => {
        e.preventDefault();
        this.setState({
            value: e.target.value
        });
    };

    render() {
        const {
            inputType,
            inputId,
            inputName,
            inputPlaceholder,
            inputProps,
            inputValue,
            numberUpButtonProps,
            numberDownButtonProps,
            searchButtonProps,
            addonPos,
            addon,
            glyph,
            actions,
            compact,
            children,
            ...props
        } = this.props;

        switch (inputType) {
            case 'number':
                const inputGroupNumberClasses = classnames(
                    'fd-input-group',
                    'fd-input-group--after',
                    {
                        'fd-input-group--compact': compact
                    }
                );

                const inputNumberClasses = classnames(
                    {
                        'fd-input fd-input--compact': compact
                    }
                );
                return (
                    <div
                        {...props}
                        className={inputGroupNumberClasses}>
                        <input
                            {...inputProps}
                            className={inputNumberClasses}
                            id={inputId}
                            name={inputName}
                            onChange={this.handleTextChange}
                            type='number'
                            value={this.state.value} />
                        <span className='fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after'>
                            <button
                                {...numberUpButtonProps}
                                aria-label='Step up'
                                className='fd-input-group__button fd-input-group__button--step-up sap-icon--slim-arrow-up'
                                onClick={this.handleUp} />
                            <button
                                {...numberDownButtonProps}
                                aria-label='Step down'
                                className='fd-input-group__button fd-input-group__button--step-down sap-icon--slim-arrow-down'
                                onClick={this.handleDown} />
                        </span>
                    </div>
                );

            case 'search':
                const inputGroupSearchClasses = classnames(
                    'fd-input-group',
                    {
                        'fd-input-group--compact': compact
                    }
                );

                const inputSearchClasses = classnames(
                    {
                        'fd-input fd-input--compact': compact
                    }
                );
                return (
                    <div
                        {...props}
                        className={inputGroupSearchClasses}>
                        <input
                            {...inputProps}
                            className={inputSearchClasses}
                            id={inputId}
                            name={inputName}
                            onChange={this.handleChange}
                            placeholder={inputPlaceholder}
                            type='search'
                            value={this.state.searchValue} />
                        <span className='fd-input-group__addon fd-input-group__addon--button'>
                            <button
                                {...searchButtonProps}
                                aria-label='Clear'
                                className='fd-input-group__button fd-input-group__button--clear'
                                onClick={this.handleClear} />
                        </span>
                    </div>
                );
            case 'text':
            default: {
                if (addonPos === 'before') {
                    const inputGroupBeforeClasses = classnames(
                        'fd-input-group',
                        'fd-input-group--before',
                        {
                            'fd-input-group--compact': compact
                        }
                    );

                    const inputBeforeClasses = classnames(
                        {
                            'fd-input fd-input--compact': compact
                        }
                    );

                    return (
                        <div
                            {...props}
                            className={inputGroupBeforeClasses}>
                            {actions ? (
                                <span className='fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--before'>
                                    {children}
                                </span>
                            ) : (
                                <span className='fd-input-group__addon fd-input-group__addon--before'>
                                    {glyph ? (
                                        <span
                                            className={`sap-icon--${glyph}`}
                                            role='presentation' />
                                    ) : (
                                        addon
                                    )}
                                </span>
                            )}
                            <input
                                {...inputProps}
                                className={inputBeforeClasses}
                                id={inputId}
                                name={inputName}
                                onChange={this.handleTextChange}
                                type='text'
                                value={this.state.value} />
                        </div>
                    );
                } else {
                    const inputGroupAfterClasses = classnames(
                        'fd-input-group',
                        'fd-input-group--after',
                        {
                            'fd-input-group--compact': compact
                        }
                    );

                    const inputAfterClasses = classnames(
                        {
                            'fd-input fd-input--compact': compact
                        }
                    );

                    return (
                        <div
                            {...props}
                            className={inputGroupAfterClasses}>
                            <input
                                {...inputProps}
                                className={inputAfterClasses}
                                id={inputId}
                                name={inputName}
                                onChange={this.handleTextChange}
                                type='text'
                                value={this.state.value} />
                            {actions ? (
                                <span className='fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after'>
                                    {children}
                                </span>
                            ) : (
                                <span className='fd-input-group__addon fd-input-group__addon--after'>
                                    {glyph ? (
                                        <span
                                            className={`sap-icon--${glyph}`}
                                            role='presentation' />
                                    ) : (
                                        addon
                                    )}
                                </span>
                            )}
                        </div>
                    );
                }
            }
        }
    }
}
InputGroup.displayName = 'InputGroup';

InputGroup.propTypes = {
    actions: PropTypes.bool,
    addon: PropTypes.string,
    addonPos: PropTypes.oneOf(INPUT_GROUP_ADDON_POSITIONS),
    children: PropTypes.node,
    compact: PropTypes.bool,
    glyph: PropTypes.string,
    inputId: PropTypes.string,
    inputName: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputProps: PropTypes.object,
    inputType: PropTypes.oneOf(INPUT_GROUP_TYPES),
    inputValue: PropTypes.any,
    numberDownButtonProps: PropTypes.object,
    numberUpButtonProps: PropTypes.object,
    searchButtonProps: PropTypes.object
};

InputGroup.defaultProps = {
    addonPos: 'after',
    inputType: 'text',
    inputValue: ''
};

InputGroup.propDescriptions = {
    actions: 'Set to **true** to enable an input with actions. Actions can be shown with a text label or icon.',
    addon: 'The value of the add-on.',
    addonPos: 'Location of the add-on relative to the input.',
    inputId: 'Value for the `id` attribute on the `<input>` element.',
    inputName: 'Value for the `name` attribute on the `<input>` element.',
    inputPlaceholder: 'Value for the `placeholder` attribute on the `<input>` element.',
    inputType: 'Value for the `type` attribute on the `<input>` element.',
    inputValue: 'Value for the `value` attribute on the `<input>` element.',
    numberDownButtonProps: 'Additional props to be spread to the down `<button>` element (for inputType=\'number\').',
    numberUpButtonProps: 'Additional props to be spread to the up `<button>` element (for inputType=\'number\').',
    searchButtonProps: 'Additional props to be spread to the `<button>` element.'
};
