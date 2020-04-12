import React from 'react';

export default function Item({ repository, remove }) {
  return (
    <li>
      {repository.title}

      <button onClick={() => remove(repository.id)}>
        Remover
      </button>
    </li>
  );
}