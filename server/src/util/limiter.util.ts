import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
	max: 30,
	windowMs: 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!'
})
