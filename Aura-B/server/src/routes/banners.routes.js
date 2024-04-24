import { Router } from 'express';
import {
	// createBanner,
	// deleteBanner,
	// getBanner,
	getBanners,
	// updateBanner,
	// toogleBanner,
} from '../controllers/banners.controllers.js';

const router = Router();

router.get('/', getBanners);
// router.get('/:id', getBanner);
// router.post('/', createBanner);
// router.put('/:id', updateBanner);
// router.delete('/:id', toogleBanner);
// router.delete('/delete/:id', deleteBanner);

export default router;
