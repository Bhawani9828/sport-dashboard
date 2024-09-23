import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import TableOne from '../../components/Tables/TableOne';
import { FaCampground,FaBell,FaBellSlash } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Academy " total="1500" rate="0.43%" levelUp>
        <FaCampground className="fill-[#006666] dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Subscribe" total="1000" rate="4.35%" levelUp>
        <FaBell className="fill-[#006666] dark:fill-white" />
        </CardDataStats>
        <CardDataStats title=" Unsubscribe" total="500" rate="2.59%" levelUp>
        <FaBellSlash className="fill-[#006666] dark:fill-white" />
        </CardDataStats>
        <CardDataStats title="Total Users" total="2000k" rate="0.95%" levelDown>
        <ImUsers className="fill-[#006666] dark:fill-white" />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
       
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;
