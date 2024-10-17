import { FaGithub, FaLinkedin, FaFolder } from 'react-icons/fa';

function Minyu() {
  return (
    <div>
      <h2>Minyu Zhang</h2>
      <a
        className='dev-icon'
        target='_blank'
        href='https://github.com/looklook33/'
      >
        <FaGithub />
      </a>
      <a
        className='dev-icon'
        target='_blank'
        href='https://www.linkedin.com/in/minyu-zhang-058b6857/'
      >
        <FaLinkedin />
      </a>
    </div>
  );
}

export default Minyu;
