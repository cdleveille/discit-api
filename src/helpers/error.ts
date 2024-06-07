export class BadRequestError extends Error {
	status: number;
	constructor(message = "Bad Request") {
		super(message);
		this.status = 400;
	}
}

export class UnauthorizedError extends Error {
	status: number;
	constructor(message = "Unauthorized") {
		super(message);
		this.status = 401;
	}
}

export class NotFoundError extends Error {
	status: number;
	constructor(message = "Not Found") {
		super(message);
		this.status = 404;
	}
}

export class InternalServerError extends Error {
	status: number;
	constructor(message = "Internal Server Error") {
		super(message);
		this.status = 500;
	}
}
