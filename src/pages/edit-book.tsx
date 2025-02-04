/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "../hooks/useAuth";

const EditBooks = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container px-6 mx-auto grid">
      {/* main content */}
      <h2 className="my-6 text-2xl font-semibold">add</h2>
    </div>
  );
};

export default EditBooks;
