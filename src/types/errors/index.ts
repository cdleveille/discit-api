import { CommonError } from "./common";

export { CommonError };
export class BadRequestError extends CommonError {
	constructor(message = "bad request") {
		super(message, 400);
	}
}
export class UnauthorizedError extends CommonError {
	constructor(message = "unauthorized") {
		super(message, 401);
	}
}
export class ForbiddenError extends CommonError {
	constructor(message = "forbidden") {
		super(message, 403);
	}
}
export class NotFoundError extends CommonError {
	constructor(message = "not found") {
		super(message, 404);
	}
}
export class TooManyRequestsError extends CommonError {
	constructor(message = "too many requests") {
		super(message, 429);
	}
}
export class InternalServerError extends CommonError {
	constructor(message = "internal server error") {
		super(message, 500);
	}
}
