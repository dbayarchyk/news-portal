import React, { useRef, useState, useLayoutEffect } from "react";

import styles from "./autocomplete-input.module.scss";

export type Suggestion = {
  label: string;
  value: string;
};
type AutocompleteInputProps = Omit<JSX.IntrinsicElements["input"], "className" | "type" | "autoComplete"> & {
  suggestions: Suggestion[];
};

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  suggestions,
  onBlur,
  onFocus,
  ...textInputProps
}) => {
  const [isSuggestionsListVisible, setIsSuggestionsListVisible] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>();
  const containerRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex <= suggestions.length) {
      scrollSelectedSuggestionIntoView();
    }
  }, [selectedSuggestionIndex]);

  const handleContainerKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch(event.key) {
      case "ArrowUp":
        handleContainerArrowUpKeyPress(event);
        break;
      case "ArrowDown":
        handleContainerArrowDownKeyPress(event);
        break;
      case "Enter":
        handleContainerEnterKeyPress(event);
        break;
      case "Escape":
        handleContainerEscapeKeyPress();
        break;
    }
  };

  const handleContainerArrowUpKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    const nextPossibleSuggestionIndex = selectedSuggestionIndex - 1;

    if (nextPossibleSuggestionIndex < 0) {
      setIsSuggestionsListVisible(false);
      setSelectedSuggestionIndex(-1);
    } else {
      setSelectedSuggestionIndex(nextPossibleSuggestionIndex);
    }
  };

  const handleContainerArrowDownKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    const nextPossibleSuggestionIndex = selectedSuggestionIndex + 1;

    if (!isSuggestionsListVisible) {
      setIsSuggestionsListVisible(true);
    }

    if (nextPossibleSuggestionIndex < suggestions.length) {
      setSelectedSuggestionIndex(nextPossibleSuggestionIndex);
    }
  };

  const handleContainerEnterKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (selectedSuggestionIndex === -1) {
      return;
    }

    event.preventDefault();
    applySuggestion(suggestions[selectedSuggestionIndex]);
    setSelectedSuggestionIndex(-1);
  };

  const handleContainerEscapeKeyPress = () => {
    setIsSuggestionsListVisible(false);
    setSelectedSuggestionIndex(-1);
  };
  
  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsSuggestionsListVisible(true);

    if (onFocus) {
      onFocus(event);
    }
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // TODO: remove when migrate to react v17.
    // https://reactjs.org/docs/legacy-event-pooling.html
    event.persist();

    setTimeout(() => {
      const isFocusWithinContainer = containerRef.current.contains(document.activeElement);

      if (isFocusWithinContainer) {
        return;
      }

      setIsSuggestionsListVisible(false);
      setSelectedSuggestionIndex(-1);

      if (onBlur) {
        onBlur(event);
      }
    });
  }

  const scrollSelectedSuggestionIntoView = () => {
    const selectedSuggestion = containerRef.current.querySelector('[aria-selected="true"]');

    if (!selectedSuggestion) {
      return;
    }

    if ("scrollIntoViewIfNeeded" in selectedSuggestion) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (selectedSuggestion as any).scrollIntoViewIfNeeded(false);
    } else {
      selectedSuggestion.scrollIntoView(false);
    }
  }

  const applySuggestion = (suggestion: Suggestion) => {
    triggerReactChangeEvent(inputRef.current, suggestion.value);
    inputRef.current.focus();
    setIsSuggestionsListVisible(false);
  }

  const shouldShowSuggestionsList = suggestions.length > 0 && isSuggestionsListVisible;
  const suggestionsListId = `autocomplete${textInputProps.name ? `-${textInputProps.name}` : ""}-suggestions-list`;

  return (
    <div
      className={`${styles.inputContainer} ${shouldShowSuggestionsList ? styles.withSuggestions : ""}`}
      ref={containerRef}
      onKeyDown={handleContainerKeyPress}
    >
      <input
        {...textInputProps}
        className={styles.input}
        ref={inputRef}
        autoComplete="off"
        role="combobox"
        aria-expanded={shouldShowSuggestionsList}
        aria-autocomplete="list"
        aria-owns={suggestionsListId}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        list="exampleList"
      />

      <ul
        className={styles.suggestionsList}
        role="listbox"
        id={suggestionsListId}
      >
        {suggestions.map((suggestion, suggestionIndex) => (
          <li
            key={suggestion.value}
            className={styles.suggestionsListItem}
            aria-selected={selectedSuggestionIndex === suggestionIndex}
            aria-posinset={suggestionIndex + 1}
            aria-setsize={suggestions.length}
            role="option"
            tabIndex={-1}
            onClick={() => applySuggestion(suggestion)}
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
const triggerReactChangeEvent = (input: HTMLInputElement, value: string) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, "value"
  ).set;

  nativeInputValueSetter.call(input, value);

  input.dispatchEvent(new Event('input', { bubbles: true }));
};

export default AutocompleteInput;
