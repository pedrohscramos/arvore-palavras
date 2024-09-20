import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import HierarchyTree from '../HierarchyTree';

describe('HierarchyTree Component', () => {
  it('should render hierarchy builder elements', () => {
    render(<HierarchyTree />);

    expect(screen.getByText('Árvore de palavras')).toBeInTheDocument();
    expect(screen.getByText('Salvar Árvore')).toBeInTheDocument();
  });

  it('should add nodes and render the hierarchy correctly', () => {
    render(<HierarchyTree />);

    // Adiciona uma palavra no nível raiz
    fireEvent.change(screen.getByPlaceholderText('Adicione uma palavra'), { target: { value: 'Animais' } });
    fireEvent.change(screen.getByPlaceholderText('Caminho (ex: Animais.Mamíferos)'), { target: { value: '' } });
    fireEvent.click(screen.getByText('Adicionar Palavra'));

    // Verifica se a palavra "Animais" aparece no DOM
    expect(screen.getByText('Animais')).toBeInTheDocument();

    // Adiciona uma subcategoria
    fireEvent.change(screen.getByPlaceholderText('Adicione uma palavra'), { target: { value: 'Mamíferos' } });
    fireEvent.change(screen.getByPlaceholderText('Caminho (ex: Animais.Mamíferos)'), { target: { value: 'Animais' } });
    fireEvent.click(screen.getByText('Adicionar Palavra'));

    // Verifica se a subcategoria "Mamíferos" aparece aninhada em "Animais"
    expect(screen.getByText('Mamíferos')).toBeInTheDocument();
  });

  it('should download the hierarchy as a JSON file when clicking "Salvar Árvore"', () => {
    const { container } = render(<HierarchyTree />);

    global.URL.createObjectURL = jest.fn();
    // Simula a adição de uma palavra
    fireEvent.change(screen.getByPlaceholderText('Adicione uma palavra'), { target: { value: 'Animais' } });
    fireEvent.click(screen.getByText('Adicionar Palavra'));

    // Simula o clique no botão "Salvar Árvore"
    const saveButton = screen.getByText('Salvar Árvore');
    const createElementSpy = jest.spyOn(document, 'createElement');
    fireEvent.click(saveButton);

    // Verifica se o arquivo foi gerado e o link de download foi criado
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(container).toMatchSnapshot();
  });
});
