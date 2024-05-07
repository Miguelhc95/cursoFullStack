import { useDispatch } from 'react-redux';
import { setFilter } from '../components/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterText = event.target.value;
    dispatch(setFilter(filterText));
  };

  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter; 
