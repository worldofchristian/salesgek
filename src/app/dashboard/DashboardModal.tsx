import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft, FaPencilAlt, FaPlus } from 'react-icons/fa';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    label: string;
    count: number;
    color: string;
  };
  onSave: (data: { label: string; count: number; color: string }) => void;
}

const DashboardModal: React.FC<DashboardModalProps> = ({ isOpen, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({ label: '', count: 0, color: '' });
  const [isSelectMultiple, setIsSelectMultiple] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({ label: '', count: 0, color: '' });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="bg-base-100 p-10 w-full min-h-screen">
        <div className='fixed top-10 right-0 left-0 mx-auto max-w-xs lg:max-w-lg bg-base-100'>
            <div className='flex flex-row items-center justify-center gap-5 lg:gap-10'>
                <button 
                className='btn btn-outline rounded-2xl'
                onClick={onClose}
                >
                    <FaAngleDoubleLeft className='text-lg' />
                    Back
                </button>

                <h2 className="text-3xl font-semibold text-center text-base-content">{formData.label}</h2>
            </div>
        </div>
        
        <div className='fixed bottom-10 left-0 right-0 mx-auto max-w-xs'>
            <button 
            type="submit" 
            className="btn btn-primary w-full mb-4"
            >
                Save changes
            </button>

            <button 
            onClick={onClose} 
            className="btn btn-neutral w-full"
            >
                Cancel
            </button>
        </div>

        <div className='flex items-center justify-center'>
          <div className='flex flex-col mt-32 w-96'>
            <div className='flex flex-row items-center justify-center gap-5'>
              <button 
              className={`btn ${isSelectMultiple ? 'btn-neutral' : 'btn-outline'} btn-sm rounded-xl`}
              onClick={() => setIsSelectMultiple(!isSelectMultiple)}
              >
                {isSelectMultiple ?
                'Cancel'
                :
                'Select multiple'
                }
              </button>
              
              {isSelectMultiple ?
                <button 
                className='btn btn-outline btn-sm rounded-xl'
                >
                    Select all
                </button>
                :
                <button className='btn btn-neutral btn-sm rounded-xl'>
                    New
                    <FaPlus />
                </button>
              }
            </div>

            <div className='flex flex-row items-center justify-start gap-5 mt-10'>
              {isSelectMultiple ? 
                  <input type="checkbox" className="checkbox checkbox-md" />
                  :
                  <FaPencilAlt className='text-lg text-base-content' /> 
              } 

              <p className='text-lg text-base-content'>Company 1</p>

              <span className="badge badge-info badge-sm">Upwork</span>
            </div>

            <p className='text-sm text-base-content mt-2'>Refactor a Wordpress site with React</p>

            <div className='flex flex-row items-center justify-start gap-5 mt-10'>
              {isSelectMultiple ? 
                  <input type="checkbox" className="checkbox checkbox-md" />
                  :
                  <FaPencilAlt className='text-lg text-base-content' /> 
              } 

              <p className='text-lg text-base-content'>Company 2</p>

              <span className="badge badge-accent badge-sm">LinkedIn</span>
            </div>

            <p className='text-sm text-base-content mt-2'>Wants a UI component library</p>

            <div className='flex flex-row items-center justify-start gap-5 mt-10'>
              {isSelectMultiple ? 
                  <input type="checkbox" className="checkbox checkbox-md" />
                  :
                  <FaPencilAlt className='text-lg text-base-content' /> 
              } 

              <p className='text-lg text-base-content'>Company 3</p>

              <span className="badge badge-info badge-sm">Upwork</span>
            </div>

            <p className='text-sm text-base-content mt-2'>Wants a landing page from a Figma design</p>
          </div>     
      </div>
    </div>
  );
};

export default DashboardModal;