import React, { useMemo } from 'react';
import { FaAngleDoubleRight, FaPencilAlt } from 'react-icons/fa';

// Linear interpolation
function interpolate(start: number, end: number, steps: number) {
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(start + (end - start) * (i / (steps - 1)));
  }
  return result;
}

// Interpolate colors for gradient effect
function interpolateColor(color1: string, color2: string, factor: number) {
  const result = color1.slice(4, -1).split(',').map((num, idx) => {
    return Math.round(parseInt(num) + factor * (parseInt(color2.slice(4, -1).split(',')[idx]) - parseInt(num)));
  });
  return `rgb(${result.join(',')})`;
}

// Moving average smoothing
function movingAverage(data: number[], windowSize: number) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const end = i + 1;
    const window = data.slice(start, end);
    const average = window.reduce((sum, val) => sum + val, 0) / window.length;
    result.push(average);
  }
  return result;
}

export default function Dashboard() {
  const stages = useMemo(() => [
    { label: 'Awaiting response', count: 87, color: 'rgb(59, 130, 246)' },
    { label: 'Contacted', count: 32, color: 'rgb(147, 197, 253)' },
    { label: 'Demo out', count: 5, color: 'rgb(59, 130, 246)' },
  ], []);
  
  const interpolatedData = useMemo(() => {
    const result = [];
    const stepsPerStage = 30;
  
    for (let i = 0; i < stages.length - 1; i++) {
      const current = stages[i];
      const next = stages[i + 1];
      const interpValues = interpolate(current.count, next.count, stepsPerStage);
  
      interpValues.forEach((value, index) => {
        const colorFactor = index / stepsPerStage;
        result.push({
          value,
          color: interpolateColor(current.color, next.color, colorFactor),
        });
      });
    }
  
    // Add the last stage
    const lastStage = stages[stages.length - 1];
    for (let i = 0; i < stepsPerStage; i++) {
      result.push({ value: lastStage.count, color: lastStage.color });
    }
  
    // Moving average smoothing
    const windowSize = 1000; // control smoothness
    const smoothedValues = movingAverage(result.map(d => d.value), windowSize);
    
    return result.map((d, i) => ({
      ...d,
      value: smoothedValues[i]
    }));
  }, [stages]);

  const maxValue = Math.max(...interpolatedData.map(d => d.value));

  interface ProgressBarProps {
    value: number;
    maxValue: number;
    color: string;
    isLeft: boolean;
  }
  
  const ProgressBar = ({ value, maxValue, color, isLeft }: ProgressBarProps) => (
    <div className={`h-1 w-full ${isLeft ? 'flex justify-end' : ''}`}>
      <div
        className={`h-full ${isLeft ? 'rounded-l-full' : 'rounded-r-full'}`}
        style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
      ></div>
    </div>
  );

  return (
    <div className="flex items-center justify-center bg-base-100">
      <div className='flex flex-col items-center justify-center w-full max-w-7xl py-12'>
        <select className='select select-bordered w-40 rounded-full'>
          <option>Funnel 1</option>
          <option>Funnel 2</option>
        </select>

        <button className='btn btn-outline btn-sm rounded-full w-24 mt-4'>
          <div className='flex flex-row items-center'>
            Edit
            <FaPencilAlt className='ml-2' />
          </div>
        </button>

        <div className='flex flex-row w-full mt-10 p-4'>
          {/* Left Distribution */}
          <div className='w-1/4 space-y-0.5'>
            {interpolatedData.map((data, index) => (
              <ProgressBar
                key={index}
                value={data.value}
                maxValue={maxValue}
                color={data.color}
                isLeft={true}
              />
            ))}
          </div>

          {/* Central Column */}
          <div className='w-1/2 flex flex-col justify-between p-4'>
            {stages.map((stage, index) => (
              <div key={index} className='flex flex-col items-center justify-center text-center text-base-content'>
                <p className='text-2xl font-semibold mb-2'>{stage.label}</p>
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
          <div className='w-1/4 space-y-0.5'>
            {interpolatedData.map((data, index) => (
              <ProgressBar
                key={index}
                value={data.value}
                maxValue={maxValue}
                color={data.color}
                isLeft={false}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col w-72 lg:w-4/6 mt-10'>
          <div className='flex flex-row justify-between items-center'>
            <p className='text-3xl lg:text-4xl'>&#x1F60E;</p>

            <div className='flex flex-col items-center'>
              <h1 className='text-2xl font-semibold text-base-content mb-2'>Sold</h1>

              <p className='text-4xl font-bold text-base-content'>
                  12
                  <span className='text-lg font-normal text-base-content ml-2'>sales</span>
                </p>

                <button className='btn btn-outline btn-sm rounded-full w-32 mt-4'>
                  <div className='flex flex-row items-center'>
                    Open
                    <FaAngleDoubleRight className='ml-2' />
                  </div>
                </button>
            </div>

            <p className='text-3xl lg:text-4xl'>&#x1F60E;</p>
          </div>
        </div>
      </div>
    </div>
  );
}