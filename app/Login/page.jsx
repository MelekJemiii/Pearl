
import Image from "next/image";
import LogRegBack from "@/components/LogRegBack";


export default async function Home() {




  return (
    <div className="flex items-center justify-center h-screen">
      
      <div className="flex items-center space-x-8 p-4 bg-gray-200 rounded-lg shadow-lg">
        {/* Image on the left */}
        <div className="w-1/2">
        
            <Image
              src="/log.jpg" // Correct path to image in the public folder
              width={600}
              height={100}
              alt="Image"
              className="rounded-lg object-cover"
            />
       
        </div>

        {/* Component on the right */}
        <div className="w-1/2 px-4  ">
          <LogRegBack />
        </div>
      </div>
    </div>
  );
}
