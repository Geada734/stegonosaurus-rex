import { Link } from 'react-router-dom';

import navData from '../static/navItems';

function Navigation(){
    return (
        <nav>
            <ul>
                {navData.navItems.map(navItem => 
                    <li key={navItem.key}><Link to={navItem.path}>{navItem.name}</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;