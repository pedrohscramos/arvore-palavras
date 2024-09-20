import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import WordInput from '../WordInput';

describe('WordInput Component', () => {
  it('should render input fields and button', () => {
    render(<WordInput onAddNode={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Adicione uma palavra')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Caminho (ex: Animais.Mamíferos)')).toBeInTheDocument();
    expect(screen.getByText('Adicionar Palavra')).toBeInTheDocument();
  });

  it('should call onAddNode with correct parameters when adding a word', () => {
    const mockOnAddNode = jest.fn();
    render(<WordInput onAddNode={mockOnAddNode} />);

    // Simula a digitação de palavra e caminho
    fireEvent.change(screen.getByPlaceholderText('Adicione uma palavra'), { target: { value: 'Leões' } });
    fireEvent.change(screen.getByPlaceholderText('Caminho (ex: Animais.Mamíferos)'), { target: { value: 'Animais.Mamíferos' } });

    // Clica no botão para adicionar
    fireEvent.click(screen.getByText('Adicionar Palavra'));

    // Verifica se a função onAddNode foi chamada corretamente
    expect(mockOnAddNode).toHaveBeenCalledWith(['Animais', 'Mamíferos'], 'Leões');
  });

  it('should clear input fields after adding a word', () => {
    const mockOnAddNode = jest.fn();
    render(<WordInput onAddNode={mockOnAddNode} />);

    // Simula a digitação de palavra e caminho
    fireEvent.change(screen.getByPlaceholderText('Adicione uma palavra'), { target: { value: 'Leões' } });
    fireEvent.change(screen.getByPlaceholderText('Caminho (ex: Animais.Mamíferos)'), { target: { value: 'Animais.Mamíferos' } });

    // Clica no botão para adicionar
    fireEvent.click(screen.getByText('Adicionar Palavra'));

   });
});
