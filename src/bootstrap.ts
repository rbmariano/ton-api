import dotenv from "dotenv";

const result = dotenv.config();

const Environment = process.env.NODE_ENV || "development";

if (Environment === "development" && result.error) {
  console.log(result.parsed);
  throw result.error;
}
