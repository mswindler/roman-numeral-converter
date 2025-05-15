import React, { useState } from 'react';
import {
  View,
  Flex,
  Form,
  NumberField,
  Button,
  Text,
  Heading,
  ProgressCircle,
  StatusLight
} from '@adobe/react-spectrum';
import { convertToRomanNumeral } from '../utils/api';

function RomanNumeralConverter() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (inputValue >= 1 && inputValue <= 3999) {
      setIsValid(true);
      setError(null);
      setIsLoading(true);
      
      try {
        const data = await convertToRomanNumeral(inputValue);
        setResult(data);
      } catch (err) {
        setError(err);
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsValid(false);
      setResult(null);
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setIsValid(true);
    setError(null);
  };

  return (
    <View padding="size-1000">
      <Flex direction="column" gap="size-200">
        <Heading level={1}>Roman Numeral Converter</Heading>
        
        <Form onSubmit={handleSubmit} maxWidth="size-3000">
          <Flex direction="column" gap="size-200">
            <NumberField
              label="Enter a number (1-3999)"
              value={inputValue}
              onChange={handleInputChange}
              minValue={1}
              maxValue={3999}
              width="100%"
              isRequired
              validationState={isValid ? 'valid' : 'invalid'}
              errorMessage={!isValid && "Please enter a number between 1 and 3999"}
              formatOptions={{
                useGrouping: false,
                maximumFractionDigits: 0
              }}
              step={1}
            />
            
            <Button
              variant="cta"
              type="submit"
              isDisabled={isLoading}
            >
              Convert to Roman Numeral
            </Button>
          </Flex>
        </Form>

        <View marginTop="size-200">
          {isLoading ? (
            <ProgressCircle aria-label="Converting..." isIndeterminate />
          ) : error ? (
            <StatusLight variant="negative">
              Error: {error.response?.data || 'Something went wrong'}
            </StatusLight>
          ) : result ? (
            <Flex direction="column" gap="size-100">
              <Text>Result:</Text>
              <Heading level={2}>{result.output}</Heading>
            </Flex>
          ) : null}
        </View>
      </Flex>
    </View>
  );
}

export default RomanNumeralConverter; 