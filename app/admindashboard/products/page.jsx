// pages/admindashboard/products.jsx
"use client";
import React, { useState,useTransition , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from './data-table';
import { columns } from './columns';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Add_product from './add_product';
async function getProducts() {
  const response = await fetch('../../api/backofficeProducts');
  const data = await response.json();
  return data.products;
}

export default function Products () {
 const [products, setProducts] = useState([]);
 const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      router.refresh();
    }
    fetchProducts();
  }, []);
    return (
        <div>
        <h1>Products Page</h1>
         <div className="container mx-auto py-10">
              <DataTable columns={columns} data={products}  functions={setProducts} />
            </div>
            <Sheet>
  <SheetTrigger >Add Product</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Product Details</SheetTitle>
      <SheetDescription>

      </SheetDescription>
    </SheetHeader>
    <Add_product/>
  </SheetContent>
</Sheet>

      </div>
    );
}

