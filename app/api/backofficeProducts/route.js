// backofficeproducts/route.js
import Product from "@/models/product";  // Adjust path as necessary for your Product model
import { connectMongoDB } from "@/lib/mongodb"; // Adjust path to connect to your MongoDB

// // GET method to fetch all products
export async function GET(req) {
   try {
//     // Connect to MongoDB
//      await connectMongoDB();

    // Fetch all products from the Product model
    const products = await Product.find();

   // Format the products data to match the required structure
   const formattedProducts = products.map(product => ({
      id: product._id.toString(),   // MongoDB _id as string
      Name: product.name,           // Product name
      Description: product.description,  // Product description
      Price: product.price,         // Product price
    Quantity: product.quantity,   // Product quantity
             // Product image URL (if exists)
             Created: product.createdAt  // Timestamp of product creation
     }));

    // Return the formatted products as a JSON response
    return new Response(JSON.stringify({ products: formattedProducts }), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch products", error: error.message }), { status: 500 });
  }
}

// // POST method to create a new product
export async function POST(req) {
    try {
        await connectMongoDB();  
      // Parse the JSON body from the request
      const productData = await req.json();  // Assuming frontend sends data as JSON
  
      // Destructure the product data from the request
      const { name, description, price, quantity } = productData;
  
      // Check if all fields are provided
      if (!name || !description || !price || !quantity) {
        return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 });
      }
  
      // Create a new product object and save it to MongoDB
      const newProduct = new Product({
        name,
        description,
        price,
        quantity,
      });
  
      // Save the new product to the database
      await newProduct.save();
  
      // Return the created product as a response
      return new Response(JSON.stringify({ product: newProduct }), { status: 201 });
  
    } catch (error) {
      console.error("Error creating product:", error);
      return new Response(JSON.stringify({ message: "Failed to create product", error: error.message }), { status: 500 });
    }
  }