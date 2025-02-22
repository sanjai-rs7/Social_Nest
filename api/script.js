import mongoose from "mongoose";
import fs from "fs";
import User from "./models/User.js";
const MONGO_URI = "YOUR_MONGO_URL";

const insertUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    const usersData = JSON.parse(
      fs.readFileSync("user_sample_data.json", "utf-8")
    );
    const insertedUsers = await User.insertMany(usersData);
    console.log(`Inserted ${insertedUsers.length} users successfully!`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting users:", error);
    mongoose.connection.close();
  }
};
insertUsers();
