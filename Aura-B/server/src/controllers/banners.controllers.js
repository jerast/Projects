import { responseError } from '../middlewares/responseError.js';
import Banner from '../models/banners.models.js';

export const getBanners = async (request, response) => {
	try {
		const banners = await Banner.find();

		return response.json({
			ok: true,
			banners,
		});
	} catch (error) {
		responseError(response, error);
	}
};

/* export const getBanner = async (request, response) => {
	try {
		const { id } = request.params;

		const banner = await Banner.findById(id);

		if (!banner) {
			return response.status(404).json({
				ok: false,
				message: `Banner not found`,
			});
		}

		return response.json({
			ok: true,
			banner,
		});
	} catch (error) {
		responseError(response, error);
	}
}; */

/* export const createBanner = async (request, response) => {
	try {
		const banner = new Banner({ ...request.body });
		await banner.save();

		return response.json({
			ok: true,
			banner,
		});
	} catch (error) {
		responseError(response, error);
	}
}; */

/* export const updateBanner = async (request, response) => {
	try {
		const { id } = request.params;
		const { text, image, action } = request.body;

		const banner = await Banner.findById(id);

		if (!banner) {
			return response.status(404).json({
				ok: false,
				message: `Banner not found`,
			});
		}

		if (!text && !image && !action) {
			return response.status(404).json({
				ok: false,
				message: `Request can't be null`,
			});
		}

		const updatedBanner = await Banner.findByIdAndUpdate(
			id,
			{ ...request.body },
			{ new: true }
		);

		return response.json({
			ok: true,
			banner: updatedBanner,
		});
	} catch (error) {
		responseError(response, error);
	}
}; */

/* export const toogleBanner = async (request, response) => {
	try {
		const { id } = request.params;

		const banner = await Banner.findById(id);

		if (!banner) {
			return response.status(404).json({
				ok: false,
				message: `Banner not found`,
			});
		}

		const updatedBanner = await Banner.findByIdAndUpdate(
			id,
			{ state: !banner._doc.state },
			{ new: true }
		);

		return response.json({
			ok: true,
			banner: updatedBanner,
		});
	} catch (error) {
		responseError(response, error);
	}
}; */

/* export const deleteBanner = async (request, response) => {
	try {
		const { id } = request.params;

		const banner = await Banner.findById(id);

		if (!banner) {
			return response.status(404).json({
				ok: false,
				message: `Banner not found`,
			});
		}

		await Banner.findByIdAndDelete(id);

		return response.json({
			ok: true,
			message: 'Banner deleted',
		});
	} catch (error) {
		responseError(response, error);
	}
}; */
