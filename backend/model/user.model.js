import mongoose from "mongoose"; // Import Mongoose to work with MongoDB

// Define a Mongoose schema for the User collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,       // Username should be a string
    required: true,     // This field is required
  },
  email: {
    type: String,       // Email should be a string
    required: true,     // This field is required
    unique: true,       // Email must be unique in the database
  },
  password: {
    type: String,       // Password should be a string
    required: true,     // This field is required
    select: false,      // This means password will NOT be returned in queries by default (for security)
  },
  token: {
    type: String,       // Optional field to store JWT token if needed
  },
});

// Create a Mongoose model using the schema
// 'User' is the name of the model, and it will map to a 'users' collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the model so it can be used in other files
export default User;
