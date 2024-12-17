"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';

const Add_product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState(""); // Error 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!name || !description || !price || !quantity) {
      setError("All fields are required.");
      return;
    }
  
    try {
      // Prepare the product data to be sent in the body of the request
      const productData = {
        name,
        description,
        price,
        quantity,
      };
  
      // Send data to backend (POST request)
      const response = await fetch("../../api/backofficeProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set the content type to JSON
        },
        body: JSON.stringify(productData),  // Send the data as a JSON string
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product.");
      }
  
      // After successful product creation, redirect to another page (admin dashboard)
      router.push("/admindashboard/products");
  
    } catch (error) {
      console.error("Error adding product:", error);
      setError("There was an error adding the product.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center">
        <Label htmlFor="name">Name</Label>
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Product Name"
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="description">Product Description</Label>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your description here."
          id="description"
        />
      </div>

      <div className="grid w-full max-w-sm items-center">
        <Label htmlFor="price">Price</Label>
        <Input
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          id="price"
          placeholder="Product Price"
        />
      </div>

      <div className="grid w-full max-w-sm items-center">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          id="quantity"
          placeholder="Product Quantity"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="picture">Picture</Label>
        <Input
          onChange={(e) => setPicture(e.target.files[0])}
          id="picture"
          type="file"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default Add_product;
