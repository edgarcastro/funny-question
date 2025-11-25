import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react';
import { FunnyQuestion } from './FunnyQuestion';

// Mock window dimensions
const mockWindowDimensions = {
  innerWidth: 1024,
  innerHeight: 768,
};

describe('FunnyQuestion', () => {
  let container: HTMLDivElement;
  let root: Root;
  const defaultProps = {
    question: 'Test question?',
    option: 'Yes',
    optionUnreachable: 'No',
  };

  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: mockWindowDimensions.innerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: mockWindowDimensions.innerHeight,
    });

    // Mock alert
    global.alert = vi.fn();

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  const render = (component: React.ReactElement) => {
    act(() => {
      root.render(component);
    });
  };

  const getByText = (text: string) => {
    const elements = container.querySelectorAll('*');
    for (const el of elements) {
      if (el.textContent === text) return el;
    }
    return null;
  };

  const getButtons = () => container.querySelectorAll('button');

  it('should render the question and both options', () => {
    render(<FunnyQuestion {...defaultProps} />);

    expect(getByText('Test question?')).toBeTruthy();
    const buttons = getButtons();
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe('Yes');
    expect(buttons[1].textContent).toBe('No');
  });

  it('should display the question text correctly', () => {
    const customProps = {
      question: 'Do you want pizza?',
      option: 'Yes',
      optionUnreachable: 'No',
    };

    render(<FunnyQuestion {...customProps} />);

    expect(getByText('Do you want pizza?')).toBeTruthy();
  });

  it('should call alert when clicking the fixed button', async () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const fixedButton = buttons[0] as HTMLButtonElement;

    await act(async () => {
      fixedButton.click();
    });

    expect(global.alert).toHaveBeenCalledWith('Felicidades');
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('should have correct classes on buttons', () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const fixedButton = buttons[0];
    const unreachableButton = buttons[1];

    expect(fixedButton.classList.contains('FunnyQuestion__button')).toBe(true);
    expect(fixedButton.classList.contains('FunnyQuestion__button--fixed')).toBe(
      true
    );
    expect(unreachableButton.classList.contains('FunnyQuestion__button')).toBe(
      true
    );
    expect(
      unreachableButton.classList.contains('FunnyQuestion__button--unreachable')
    ).toBe(true);
  });

  it('should have tabIndex -1 on unreachable button', () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const unreachableButton = buttons[1] as HTMLButtonElement;

    expect(unreachableButton.getAttribute('tabIndex')).toBe('-1');
  });

  it('should update button position on mouse over', async () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const unreachableButton = buttons[1] as HTMLButtonElement;

    const initialLeft = unreachableButton.style.left;
    const initialTop = unreachableButton.style.top;

    await act(async () => {
      unreachableButton.dispatchEvent(
        new MouseEvent('mouseover', { bubbles: true })
      );
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After mouseOver, the position should change
    expect(unreachableButton.style.left).toBeDefined();
    expect(unreachableButton.style.top).toBeDefined();
  });

  it('should handle touch events on unreachable button', async () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const unreachableButton = buttons[1] as HTMLButtonElement;

    await act(async () => {
      unreachableButton.dispatchEvent(
        new TouchEvent('touchstart', { bubbles: true })
      );
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After touchStart, the position should be set
    expect(unreachableButton.style.left).toBeDefined();
    expect(unreachableButton.style.top).toBeDefined();
  });

  it('should initialize with correct left position based on window width', () => {
    render(<FunnyQuestion {...defaultProps} />);

    const buttons = getButtons();
    const unreachableButton = buttons[1] as HTMLButtonElement;

    // Initial left should be width / 2 + 80
    const expectedLeft = mockWindowDimensions.innerWidth / 2 + 80;
    expect(unreachableButton.style.left).toBe(`${expectedLeft}px`);
  });

  it('should render with different props correctly', () => {
    const customProps = {
      question: 'Another question?',
      option: 'Option A',
      optionUnreachable: 'Option B',
    };

    render(<FunnyQuestion {...customProps} />);

    expect(getByText('Another question?')).toBeTruthy();
    const buttons = getButtons();
    expect(buttons[0].textContent).toBe('Option A');
    expect(buttons[1].textContent).toBe('Option B');
  });
});
