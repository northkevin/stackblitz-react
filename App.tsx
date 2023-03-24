import * as React from 'react';
import './style.css';

import axios from 'axios';
import { useQuery } from 'react-query';

export default function App() {
  function usePosts() {
    return useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
        const { data } = await axios.get(
          'https://jsonplaceholder.typicode.com/posts'
        );
        return data;
      },
    });
  }

  const { data, error, isError, isLoading } = usePosts();

  console.log({ data, error, isError, isLoading });
  // first argument is a string to cache and track the query result
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Posts</h1>
      {data.map((post, index) => {
        return <li key={index}>{post.title}</li>;
      })}
    </div>
  );
}
