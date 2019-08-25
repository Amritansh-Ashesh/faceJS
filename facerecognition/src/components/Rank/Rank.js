import React from 'react';;

const Rank = ({name,entries}) => {
    return (
       <div>
           <div className='white f4'>
                {`Hey ${name}, we detected faces in your images`}
           </div>
           <div className='white f4'>
                {`${entries} times`}
           </div>
       </div>
    );
}

export default Rank;