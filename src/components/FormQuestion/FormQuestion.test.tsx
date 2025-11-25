import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react';
import { FormQuestion } from './FormQuestion';

describe('FormQuestion', () => {
  let container: HTMLDivElement;
  let root: Root;
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    mockOnSubmit.mockClear();
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  });

  const render = (component: React.ReactElement) => {
    act(() => {
      root.render(component);
    });
  };

  const getElement = (selector: string) => container.querySelector(selector);
  const getByText = (text: string) => {
    const elements = container.querySelectorAll('*');
    for (const el of elements) {
      if (el.textContent === text) return el;
    }
    return null;
  };

  const getByLabelText = (labelText: string) => {
    const labels = container.querySelectorAll('label');
    for (const label of labels) {
      if (label.textContent?.includes(labelText)) {
        const inputId = label.getAttribute('for');
        if (inputId) {
          return container.querySelector(`#${inputId}`) as HTMLElement;
        }
      }
    }
    return null;
  };

  const setInputValue = async (input: HTMLTextAreaElement, value: string) => {
    // For controlled inputs, we need to set the value property and trigger onChange
    // React needs the native value setter to work
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, value);
    } else {
      input.value = value;
    }

    // Create and dispatch input event that React will recognize
    const inputEvent = new Event('input', { bubbles: true, cancelable: true });
    input.dispatchEvent(inputEvent);
  };

  it('should render the form with all fields', () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    expect(getByText('Crea tu pregunta')).toBeTruthy();
    expect(getByLabelText('¿Cual es tu pregunta?')).toBeTruthy();
    expect(getByLabelText('Ingresa la opción')).toBeTruthy();
    expect(
      getByLabelText('Ingresa la opción que no sera alcanzable')
    ).toBeTruthy();
    expect(getElement('button[type="submit"]')).toBeTruthy();
  });

  it('should show error messages when submitting empty form', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    const submitButton = getElement(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(getByText('La pregunta es requerida')).toBeTruthy();
    expect(getByText('La opción 1 es requerida')).toBeTruthy();
    expect(getByText('La opción 2 es requerida')).toBeTruthy();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show error when field contains only whitespace', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    // Submit form with whitespace-only values to trigger validation
    const questionInput = getByLabelText(
      '¿Cual es tu pregunta?'
    ) as HTMLTextAreaElement;
    const option1Input = getByLabelText(
      'Ingresa la opción'
    ) as HTMLTextAreaElement;
    const option2Input = getByLabelText(
      'Ingresa la opción que no sera alcanzable'
    ) as HTMLTextAreaElement;

    await act(async () => {
      await setInputValue(questionInput, '   ');
      await setInputValue(option1Input, '   ');
      await setInputValue(option2Input, '   ');
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 30));
    });

    const submitButton = getElement(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 30));
    });

    // Should show errors because whitespace-only values are invalid
    expect(getByText('La pregunta es requerida')).toBeTruthy();
    expect(getByText('La opción 1 es requerida')).toBeTruthy();
    expect(getByText('La opción 2 es requerida')).toBeTruthy();
  });

  it('should clear error when field is filled correctly', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    // First, trigger error with empty field by submitting
    const submitButton = getElement(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 30));
    });

    expect(getByText('La pregunta es requerida')).toBeTruthy();

    // Then fill all fields correctly and submit again
    const questionInput = getByLabelText(
      '¿Cual es tu pregunta?'
    ) as HTMLTextAreaElement;
    const option1Input = getByLabelText(
      'Ingresa la opción'
    ) as HTMLTextAreaElement;
    const option2Input = getByLabelText(
      'Ingresa la opción que no sera alcanzable'
    ) as HTMLTextAreaElement;

    await act(async () => {
      await setInputValue(questionInput, 'Test question');
      await setInputValue(option1Input, 'Option 1');
      await setInputValue(option2Input, 'Option 2');
    });

    // Wait for state update
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 30));
    });

    // Submit again - should clear errors and call onSubmit
    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 30));
    });

    // Errors should be cleared and onSubmit should be called
    expect(getByText('La pregunta es requerida')).toBeFalsy();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    const questionInput = getByLabelText(
      '¿Cual es tu pregunta?'
    ) as HTMLTextAreaElement;
    const option1Input = getByLabelText(
      'Ingresa la opción'
    ) as HTMLTextAreaElement;
    const option2Input = getByLabelText(
      'Ingresa la opción que no sera alcanzable'
    ) as HTMLTextAreaElement;

    await act(async () => {
      await setInputValue(questionInput, 'Test question');
      await setInputValue(option1Input, 'Option 1');
      await setInputValue(option2Input, 'Option 2');
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    const submitButton = getElement(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      question: 'Test question',
      option1: 'Option 1',
      option2: 'Option 2',
    });
  });

  it('should trim whitespace from submitted values', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    const questionInput = getByLabelText(
      '¿Cual es tu pregunta?'
    ) as HTMLTextAreaElement;
    const option1Input = getByLabelText(
      'Ingresa la opción'
    ) as HTMLTextAreaElement;
    const option2Input = getByLabelText(
      'Ingresa la opción que no sera alcanzable'
    ) as HTMLTextAreaElement;

    await act(async () => {
      await setInputValue(questionInput, '  Test question  ');
      await setInputValue(option1Input, '  Option 1  ');
      await setInputValue(option2Input, '  Option 2  ');
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    const submitButton = getElement(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await act(async () => {
      submitButton.click();
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      question: 'Test question',
      option1: 'Option 1',
      option2: 'Option 2',
    });
  });

  it('should update input values when typing', async () => {
    render(<FormQuestion onSubmit={mockOnSubmit} />);

    const questionInput = getByLabelText(
      '¿Cual es tu pregunta?'
    ) as HTMLTextAreaElement;

    await act(async () => {
      await setInputValue(questionInput, 'My question');
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(questionInput.value).toBe('My question');
  });
});
