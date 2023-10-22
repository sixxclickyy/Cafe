import style from './Header.module.css';
import { HeaderProps } from './Header.props.ts';
import cn from 'classnames';

const Header = ({ children, className, ...props }: HeaderProps) => {
    return (
        <div>
            <h2 className={cn(className, style['h2'])} {...props}>{children}</h2>
        </div>
    );
};

export default Header;