import React from 'react';

const Navigation = ({OnRouteChange,isSignedIn}) => {
        if (isSignedIn){
            return(
                <nav className='tr ma'>
                    <p onClick={()=>OnRouteChange('signout')} className='f3 link dim text pa3 pointer'>Sign Out</p>
                </nav>

            );
        }
        else {
            return(
                <nav className='tr ma flexsb'>
                <p onClick={()=>OnRouteChange('signin')} className='f3 link dim text pa3 pointer'>Sign In</p>
                <p onClick={()=>OnRouteChange('register')} className='f3 link dim text pa3 pointer'>Register</p>
            </nav>
            );
        }
}

export default Navigation;