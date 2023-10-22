import style from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

const Button = ({ children, className, appearance = 'small', ...props }: ButtonProps) => {
    return (
        <button {...props} className={cn(style['btn'], style['accent'], className, {
            [style['small']]: appearance === 'small',
            [style['big']]: appearance === 'big'
        })}>{children}</button>
    );
};

export default Button;