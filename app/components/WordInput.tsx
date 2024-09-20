import React, { useState } from 'react';

interface WordInputProps {
  onAddNode: (parentPath: string[], nodeName: string) => void;
}

const WordInput: React.FC<WordInputProps> = ({ onAddNode }) => {
  const [word, setWord] = useState('');
  const [parentPath, setParentPath] = useState<string>('');

  const handleAddWord = () => {
    if (word) {
      const path = parentPath.split('.').filter(Boolean); // Divide o caminho para determinar onde inserir
      onAddNode(path, word);
      setWord(''); // Limpa o campo após adicionar
    }
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Adicione uma palavra"
      />
      <input
        type="text"
        value={parentPath}
        onChange={(e) => setParentPath(e.target.value)}
        placeholder="Caminho (ex: Animais.Mamíferos)"
      />
      <button onClick={handleAddWord}>Adicionar Palavra</button>
    </div>
  );
};

export default WordInput;
