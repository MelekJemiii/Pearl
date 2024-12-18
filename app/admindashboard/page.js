
import { AdminDashChart } from '@/components/AdminDashChart';
import { Separator } from '@/components/ui/separator';
import { signOut, useSession } from "next-auth/react";



const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const Main = async() => {


  return (
    <div className='items-center' >
      <div className="flex items-center justify-center ">
  <h1 className="text-lg font-bold mb-6">Dashboard</h1>
</div>
      <Separator/>

      <div className=' border border-slate-600 ' >
      <AdminDashChart chartData={chartData} />
      </div>

    </div>
  );
};

export default Main;
