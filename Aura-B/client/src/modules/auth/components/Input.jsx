import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

export const Input = ({ type, name, placeholder, value, onChange, disabled, required }) => {
   const [ showPass, setShowPass ] = useState( false );

   const handleToggleShowPass = () => setShowPass( !showPass );

   return (
      <label className="form__input">
         <input 
            className="form__input-field" 
            // autoComplete="off" 
            type={ type !== 'password' ? type : showPass ? 'text' : 'password' } 
            name={ name }
            value={ value }
            onChange={ onChange }
            disabled={ disabled }
            required={ required }
         />
         <span className={`form__input-label ${ value ? 'form__input-label--active' : '' } `}>
            { placeholder }
         </span>

         {
            (type === 'password') &&
               <span className="form__input-icon" onClick={ handleToggleShowPass }>
                  { showPass ? <IoEyeOffOutline /> : <IoEyeOutline /> }	
               </span>
         }
      </label>
   );
};