import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/authContext";
const Home = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <h1>Home section</h1>
      <pre> {JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
