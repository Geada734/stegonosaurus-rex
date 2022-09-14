import { Link } from 'react-router-dom';

import navItems from '../static/strings';

import classes from './Navigation.module.css';
import logo from '../static/stegologo.svg';

function Navigation(){
    return (
        <nav className='navbar navbar-dark bg-dark'>
            <span className='nav-brand text-white font-weight-bold'>
                <img src={logo} alt='Logo' className={classes.logo}
                height="60em" width="60em"/>
                Stegonosaurus
            </span>
            <div className='navbar-item d-flex flex-row'>
                {navItems.map(navItem => 
                    <div className='p-2'>
                        <Link to={navItem.path} className={classes.navItem}>
                            <span>{navItem.name.en}</span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;