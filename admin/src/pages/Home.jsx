import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../components/Table';

function Home() {
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    // if (products);
  }, [products]);

  return (
    <>
      {user ? (
        <div className="container">
          <section>
            {/* Get all */}
            <div className="text-1">products Table :</div>
            {products && <Table />}

            {/* Create New One*/}
            <div className="text-1">
              Create New Product :{' '}
              <Link to="/new-product" style={{ color: 'orange' }}>
                Create New Product
              </Link>{' '}
            </div>
          </section>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Home;
