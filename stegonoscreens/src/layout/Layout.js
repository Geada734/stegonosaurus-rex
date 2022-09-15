import Navigation from './Navigation';

import classes from './Layout.module.css';

function Layout(props){
    return <div>
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className={classes.appContent + ' col-10'}>{props.children}</div>
                    <div className='col-1'></div>
                </div>
            </div>
        </div>
};

export default Layout;