import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const NotifyBar = () => {
   const { status } = useSelector( state => state.session );

   return (
      <div className="NotifyBar">
         <p>Buy 6 or more products to <span className="primary">get discount.</span></p>
         { status !== 'auth' && <Link to="/login" className="primary link">Sign up now</Link> }
      </div>
   );
};