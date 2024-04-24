import { useState } from 'react';

export const DropdownButton = ({ children, className, disabled, conditions }) => {
   const [ isOpen, setIsOpen ] = useState( false );

   return (
      <button 
         className={ className } 
         disabled={ disabled }
         // onPointerEnter={ handleDropdownOpen }
         // onPointerLeave={ handleDropdownClose }
         onBlur={ () => setTimeout(() => setIsOpen( false ), 200) }
         onClick={ () => conditions && setIsOpen( !isOpen ) }
      >
         { children[0] }
         { conditions && isOpen && children[1] }
      </button>
   );
};