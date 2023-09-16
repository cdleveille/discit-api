import { CommonError } from "./common";

export { CommonError };
export class BadRequestError extends CommonError {
	constructor(message = "Bad Request") {
		super(message, 400);
	}
}
export class UnauthorizedError extends CommonError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}
export class ForbiddenError extends CommonError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}
export class NotFoundError extends CommonError {
	constructor(message = "Not Found") {
		super(message, 404);
	}
}
export class TooManyRequestsError extends CommonError {
	constructor(message = "Too Many Requests") {
		super(message, 429);
	}
}
export class InternalServerError extends CommonError {
	constructor(message = "Internal Server Error") {
		super(message, 500);
	}
}
