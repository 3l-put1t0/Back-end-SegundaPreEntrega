import dotenv from "dotenv";

const environment = "DEVELOPMENT";

dotenv.config({
    path: environment == "DEVELOPMENT" ? "./.env.development" : "./.env.production"
});

export default{
    PORT: process.env.PORT,
    URL: process.env.URL_MONGO
}