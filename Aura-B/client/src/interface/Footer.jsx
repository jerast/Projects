import { Link } from 'react-router-dom';
import { SVGLogo, SVGMasterCard, SVGNequi, SVGVisa } from '@/assets';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
	return (
		<>
			<div className="Footer__main">
				<SVGLogo className="Footer__logo" />
				<span className="Footer__caption">The place where you can improve your beauty</span>
				<div className="Footer__social-media">
					<Link className="Footer__social-link" to="https://www.facebook.com/profile.php?id=100087026423255" target="_blank" >
						<FaFacebook />
					</Link>
					<Link className="Footer__social-link" to="https://www.instagram.com/aura.belleza77/" target="_blank" >
						<FaInstagram />
					</Link>
					<Link className="Footer__social-link" to="https://www.tiktok.com/@aura.belleza" target="_blank" >
						<FaTiktok />
					</Link>
				</div>
			</div>
			<div className="Footer__section">
				<div className="Footer__article">
					<h3 className="Footer__title">Shop</h3>
					<Link className="Footer__link" to="/products">
						Products
					</Link>
					<Link className="Footer__link" to="/categories">
						Categories
					</Link>
				</div>
				<div className="Footer__article">
					<h3 className="Footer__title">Company</h3>
					<Link className="Footer__link">
						About Us
					</Link>
					<Link className="Footer__link">
						Contact
					</Link>
				</div>
				<div className="Footer__article">
					<h3 className="Footer__title">Payment Methods</h3>
					<div className="Footer__payment-methods">
						<SVGVisa />
						<SVGMasterCard />
						<SVGNequi />
					</div>
				</div>
			</div>
			<div className="Footer__copyright">
				&copy; 2023 Aura. All rights reserverd
			</div>
		</>
	);
};



