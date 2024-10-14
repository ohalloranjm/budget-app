import { useLoaderData, useNavigate } from 'react-router-dom';
import './SaveGoals.css';

function SaveGoals() {
  const navigate = useNavigate();
  const saveGoals = useLoaderData() || [{ name: 'uh', cost: 'oh' }];
  console.log(saveGoals['Save Goals']);
  return (
    <div className='save-goals'>
      {saveGoals['Save Goals'].map(goal => (
        <div
          key={goal.id}
          className='save-goal'
          onClick={() => navigate('/save-goals/' + goal.id)}
        >
          <p>{goal.name}</p>
          <p>${goal.cost / 100}</p>
        </div>
      ))}
      <button className='dark' onClick={() => navigate('/save-goals/new')}>
        Create new Save Goal
      </button>
    </div>
  );
}

export default SaveGoals;
