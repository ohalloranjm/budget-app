import { FaGithub, FaLinkedin, FaFolder } from 'react-icons/fa';

function Joy() {
  return (
    <div>
      <h2>Joy O’Halloran</h2>
      <a
        className='dev-icon'
        target='_blank'
        href='https://www.github.com/ohalloranjm/'
      >
        <FaGithub />
      </a>
      <a
        className='dev-icon'
        target='_blank'
        href='https://www.linkedin.com/in/joy-ohalloran/'
      >
        <FaLinkedin />
      </a>
      <a
        className='dev-icon'
        target='_blank'
        href='https://ohalloranjm.github.io/'
      >
        <FaFolder />
      </a>
    </div>
  );
}

export default Joy;
