import style from './Input.module.css';
import { forwardRef } from 'react';
import cn from 'classnames';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, placeholder, ...props }, ref) {
    return (
        <>
            <input
                {...props}
                ref={ref}
                className={cn(style['input'], className, {
                    [style['invalid']]: isValid
                })}
                placeholder={placeholder}
            />
        </>
    );
});

export default Input;
