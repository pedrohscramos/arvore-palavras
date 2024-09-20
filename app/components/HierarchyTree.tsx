import React, { useState } from 'react';
import WordInput from './WordInput';

type Node = {
  [key: string]: any;
};

const HierarchyTree: React.FC = () => {
  const [tree, setTree] = useState<Node>({});

  const addNode = (parentPath: string[], nodeName: string) => {
    const newTree = { ...tree };
    let currentNode: Node = newTree;

    // Navegar até o nó pai usando o caminho fornecido
    parentPath.forEach((key) => {
      if (!currentNode[key]) {
        currentNode[key] = {};
      }
      currentNode = currentNode[key];
    });

    // Verificar se é uma lista de palavras (último nível) ou uma subcategoria (nível intermediário)
    if (Array.isArray(currentNode)) {
      currentNode.push(nodeName);
    } else {
      currentNode[nodeName] = [];
    }

    setTree(newTree);
  };

  const renderTree = (node: Node, level = 0) => {
    return Object.keys(node).map((key, index) => (
      <div key={index} style={{ marginLeft: `${level * 20}px` }}>
        {key}
        {Array.isArray(node[key]) ? (
          <ul>
            {node[key].map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          renderTree(node[key], level + 1)
        )}
      </div>
    ));
  };

  const saveHierarchy = () => {
    const json = JSON.stringify(tree, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'hierarchy.json';
    link.click();
  };

  return (
    <div>
      <h1>Árvore de palavras</h1>
      <WordInput onAddNode={addNode} />
      <div>{renderTree(tree)}</div>
      <button onClick={saveHierarchy}>Salvar Árvore</button>
    </div>
  );
};

export default HierarchyTree;
