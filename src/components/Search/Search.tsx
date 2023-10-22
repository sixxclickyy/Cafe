import { forwardRef } from 'react';
import cn from 'classnames';
import { SearchProps } from './Search.props.tsx';
import style from './Search.module.css';
import search from '/public/search.png';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, placeholder, ...props }, ref) {
    return (
        <span className={style.container}>
            <input
                {...props}
                ref={ref}
                className={cn(style['input'], className, {
                    [style['invalid']]: isValid
                })}
                placeholder={placeholder}
            />
            <img src={search} className={style.img} alt="" />
        </span>
    );
});

export default Search;
