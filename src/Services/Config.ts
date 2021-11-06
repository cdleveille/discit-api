import "dotenv/config";

export class Config {

	public static readonly Environment = {
		IS_PROD: process.env.NODE_ENV === "production" ?? false,
		PORT: parseInt(process.env.PORT as string) ?? 3000,
		HOST: process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1"
	};
}