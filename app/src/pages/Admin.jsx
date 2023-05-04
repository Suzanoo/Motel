import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import { getAllRooms } from '../features/rooms/roomSlice';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <>
      <div className="bg-pink-200">
        {user && user.data.user.role === 'admin' ? (
          <section className="flex flex-col mx-auto justify-center py-24">
            {/* Get all */}
            {rooms && <Table />}

            {/* Create New One*/}
            <div className="flex mx-auto justify-center">
              Create New Room :{' '}
              <Link
                className="hover:scale-110 ml-4"
                to="/new-room"
                style={{ color: 'orange' }}
              >
                Create New Room
              </Link>{' '}
            </div>
          </section>
        ) : (
          <h1>Nothings to show</h1>
        )}
      </div>
    </>
  );
}

export default Home;
