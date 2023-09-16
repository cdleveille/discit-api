export class CommonError extends Error {
	public message: string;
	public status: number;

	constructor(message = "Internal server error", status = 500) {
		super(message);
		this.message = message;
		this.status = status;
	}

	toJSON() {
		return {
			message: this.message,
			status: this.status
		};
	}
}
