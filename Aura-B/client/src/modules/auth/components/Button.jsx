import { useSelector } from "react-redux";

export const Button = ({ disabled, value }) => {
   const { isChecking } = useSelector( state => state.session );
   
   return (
      <button 
         className="form__button fluid" 
         disabled={ isChecking || disabled }
      >
         { isChecking ? '...' : value }
      </button>
   );
};