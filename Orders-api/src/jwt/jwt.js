import jwt from 'jsonwebtoken';
import { SECRET_JWT_SEED } from '../config.js';

export const generateJWT = ( id, name, surname, email, phone, role ) => {
	return new Promise((resolve, reject) => {
		const payload = { id, name, surname, email, phone, role };
		const options = { expiresIn: '2h' };

		jwt.sign( 
			payload, 
			SECRET_JWT_SEED, 
			options, 
			(err, token) => {
				(err) 
					? (reject('Could not generate token'), console.log( 'error token' ))
					: resolve( token );
			}
		);
	});
};
