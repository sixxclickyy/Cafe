import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <NavLink to='/'>Menu</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
        </>
    )
}

export default Navigation;