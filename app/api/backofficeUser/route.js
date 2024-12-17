// app/api/fetchusers/route.js

import { connectMongoDB } from "@/lib/mongodb";  // Adjust path as needed
import User from "@/models/user";  // Adjust path as needed

// Export the GET method to fetch users
export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all users from the User model
    const users = await User.find();  // Fetch users from MongoDB

    // Format the users data to match the required structure
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),  // Assuming '_id' is the unique identifier in MongoDB
      Name: user.name,          // Assuming 'name' is a field in your user model
      status: user.status,      // Assuming 'status' is a field in your user model
      email: user.email,
      Created : user.createdAt,        // Assuming 'email' is a field in your user model
    }));

    // Return the formatted users as a JSON response
    return new Response(JSON.stringify({ users: formattedUsers }), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch users", error: error.message }), { status: 500 });
  }
}
export async function DELETE(req, { params }) {
    const { id } = params;  // Get the user ID from the URL
    try {
      await connectMongoDB();
      const user = await User.findByIdAndDelete(id);  // Delete the user from MongoDB
  
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to delete user', error: error.message }, { status: 500 });
    }
  }
