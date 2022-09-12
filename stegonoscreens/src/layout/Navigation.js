import { Link } from 'react-router-dom';

import navItems from '../static/navItems';

function Navigation(){
    return (
        <nav>
            <ul>
                {navItems.map(navItem => 
                    <li key={navItem.key}><Link to={navItem.path}>{navItem.name.en}</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;