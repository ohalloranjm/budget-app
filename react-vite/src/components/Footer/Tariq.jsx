import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Tariq() {
  return (
    <div>
      <h2>Tariq Saleh</h2>
      <a
        className='dev-icon'
        target='_blank'
        href='https://www.github.com/saleh-tariq/'
      >
        <FaGithub />
      </a>
      <a
        className='dev-icon'
        target='_blank'
        href='https://www.linkedin.com/in/saleh-tariq/'
      >
        <FaLinkedin />
      </a>
    </div>
  );
}

export default Tariq;
