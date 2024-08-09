'use client';

import React, { useState, useMemo } from 'react';
import { FaAngleDoubleRight, FaPencilAlt } from 'react-icons/fa';

export default function SequencePage() {
  const [sequenceName] = useState('Sales Funnel');

  const stages = useMemo(() => [
    { label: 'Awaiting response', count: 6, color: 'bg-slate-600' },
    { label: 'Contacted', count: 4, color: 'bg-slate-500' },
    { label: 'Meeting scheduled', count: 2, color: 'bg-slate-400' },
    { label: 'Sold clients', count: 8, color: 'bg-slate-600' },
  ], []);

  const distributionData = useMemo(() => {
    const totalBars = 20; // Number of bars in the distribution
    const maxCount = Math.max(...stages.map(stage => stage.count));
    
    return stages.flatMap(stage => {
      const stageBars = Math.floor((stage.count / maxCount) * totalBars);
      return Array(stageBars).fill({
        percentage: (stage.count / maxCount) * 100,
        color: stage.color
      });
    });
  }, [stages]);

  const DistributionBar = ({ percentage, color, isLeft }: { percentage: number, color: string, isLeft: boolean }) => (
    <div className={`h-2 w-full ${isLeft ? 'flex justify-end' : ''}`}>
      <div
        className={`h-full ${color} ${isLeft ? 'rounded-l-lg' : 'rounded-r-lg'}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  return (
    <div className="flex items-center justify-center bg-base-100 min-h-screen p-4">
      <div className='flex flex-col items-center justify-center w-full max-w-7xl py-20'>
        <h1 className="text-4xl lg:text-5xl font-bold gradient-text text-center">
          {sequenceName}
        </h1>

        <button className='btn btn-outline btn-sm rounded-full w-44 mt-5'>
          <div className='flex flex-row items-center'>
            Edit sequence
            
            <FaPencilAlt className='ml-2' />
          </div>
        </button>

        <div className='flex flex-row w-full items-center mt-20'>
          {/* Left Distribution */}
          <div className='w-1/4 lg:w-1/2 space-y-1'>
            {distributionData.map((data, index) => (
              <DistributionBar key={index} percentage={data.percentage} color={data.color} isLeft={true} />
            ))}
          </div>

          {/* Central Column */}
          <div className='w-1/2 flex flex-col justify-between p-4'>
            {stages.map((stage, index) => (
              <div key={index} className='flex flex-col items-center justify-center text-center text-base-content mb-16'>
                <p className='text-2xl font-bold gradient-text mb-2'>{stage.label}</p>
                <p className='text-4xl font-bold'>
                  {stage.count}
                  <span className='text-lg font-normal ml-2'>active</span>
                </p>
                <button className='btn btn-outline btn-sm rounded-full w-32 mt-4'>
                  <div className='flex flex-row items-center'>
                    Open
                    <FaAngleDoubleRight className='ml-2' />
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Right Distribution */}
          <div className='w-1/4 lg:w-1/2 space-y-1'>
            {distributionData.map((data, index) => (
              <DistributionBar key={index} percentage={data.percentage} color={data.color} isLeft={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}