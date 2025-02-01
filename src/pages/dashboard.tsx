import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
       <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
      <h1>Welcome, {user.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
