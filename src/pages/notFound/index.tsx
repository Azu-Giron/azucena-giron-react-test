import React from 'react';
import { TbFaceIdError, TbError404 } from "react-icons/tb";

const NotFound: React.FC = () => {
  return (
    <div className='notFound-container'>
      <TbFaceIdError className='notFound-icon' />
      <TbError404 className='notFound2-icon' />
      <h2>Page Not Found</h2>
    </div>
  );
};

export default NotFound;
