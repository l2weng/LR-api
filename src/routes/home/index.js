import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        {/* <Home news={data.news} /> */}
        <Home />
      </Layout>
    ),
  };
}

export default action;
