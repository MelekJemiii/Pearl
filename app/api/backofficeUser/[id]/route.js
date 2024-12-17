// app/api/fetchusers/route.js

import { connectMongoDB } from "@/lib/mongodb";  // Adjust path as needed
import User from "@/models/user";  // Adjust path as needed

// Export the GET method to fetch users

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
