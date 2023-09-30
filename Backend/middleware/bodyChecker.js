const { validationResult } = require("express-validator");

exports.checker = (req, res, next) => {
	// console.log("Request Body:", req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ ...errors });
	}
	next();
};


