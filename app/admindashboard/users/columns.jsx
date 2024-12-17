"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Define the columns without TypeScript types
export const columns = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "Name",  // Ensure the accessorKey matches the property name you're passing (e.g., 'Name')
    header: ({ column }) => {
      return(
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >Name
       <ArrowUpDown className="ml-2 h-4 w-4" />
       </Button>
      )
      },
    cell: ({ row }) => {
      const name = row.getValue("Name");  // Get the name from the row data (no need to parse it)
      return <div className="text-right font-medium">{name}</div>;  // Just display the name
    },
  },
  {
    accessorKey: "Created",  // Ensure the accessorKey matches the property name you're passing (e.g., 'Created')
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("Created");  // Get the "Created" value from the row data

      // Parse the date and format it (you can use `Date` or `date-fns` to format)
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(date));

      // Return the formatted date in the cell
      return <div className="text-right font-medium">{formattedDate}</div>;
    },
  },
  
   {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
        const DeleteUser = async (id) => {
          try {
            const response = await fetch(`/api/backofficeUser/${id}`, {
              method: 'DELETE',  // Use DELETE method to delete the resource
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            if (response.ok) {
              // Handle success, maybe refresh the data or update UI
              console.log('User deleted successfully');
            } else {
              // Handle error, maybe show a message to the user
              console.error('Failed to delete user');
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => DeleteUser(user.id)}>
      Delete User
    </DropdownMenuItem>
            <DropdownMenuItem>View User details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
