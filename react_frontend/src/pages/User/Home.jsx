import { useEffect } from 'react';
import Helmet from 'react-helmet';
import Navbar from '../../components/users/Navbar';
function Home() {
    useEffect(() => {
        document.title = 'Fruits Store';
    }, []);
    return (
        <>
            <Helmet>
                <title>Fruits Store</title>
            </Helmet>
            <div>
                <Navbar />
            </div>
        </>
    );
}

export default Home;
