// app/api/fetchusers/route.js

import { connectMongoDB } from "@/lib/mongodb";  // Adjust path as needed
import Product from "@/models/product";  // Adjust path as needed

// Export the GET method to fetch users

export async function DELETE(req, { params }) {
    const { id } = params;  // Get the user ID from the URL
    try {
      await connectMongoDB();
      const product = await Product.findByIdAndDelete(id);  // Delete the user from MongoDB
  
      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to delete product', error: error.message }, { status: 500 });
    }
  }
