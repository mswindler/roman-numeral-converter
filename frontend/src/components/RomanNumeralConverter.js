import React, { useState } from 'react';
import {
  View,
  Flex,
  Form,
  TextField,
  Button,
  Text,
  Heading,
  ProgressCircle,
  StatusLight
} from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

function RomanNumeralConverter() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['romanNumeral', inputValue],
    queryFn: async () => {
      if (!inputValue) return null;
      const response = await axios.get(`${API_URL}/romannumeral?query=${inputValue}`);
      return response.data;
    },
    enabled: false,
    retry: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(inputValue, 10);
    if (num >= 1 && num <= 3999) {
      setIsValid(true);
      refetch();
    } else {
      setIsValid(false);
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setIsValid(true);
  };

  return (
    <View padding="size-1000"> {/* Using Adobe Spectrum View component */}
      <Flex direction="column" gap="size-200">
        <Heading level={1}>Roman Numeral Converter</Heading>
        
        <Form onSubmit={handleSubmit} maxWidth="size-3000">
          <Flex direction="column" gap="size-200">
            <TextField
              label="Enter a number (1-3999)"
              type="number"
              value={inputValue}
              onChange={handleInputChange} 
              min={1}
              max={3999}
              width="100%"
              validationState={isValid ? 'valid' : 'invalid'}
              errorMessage={!isValid && "Please enter a number between 1 and 3999"}
            />
            
            <Button
              variant="cta"
              type="submit"
              isDisabled={!inputValue || isFetching}
            >
              Convert to Roman Numeral
            </Button>
          </Flex>
        </Form>

        <View marginTop="size-200">
          {isLoading || isFetching ? (
            <ProgressCircle aria-label="Converting..." isIndeterminate />
          ) : error ? (
            <StatusLight variant="negative">
              Error: {error.response?.data || 'Something went wrong'}
            </StatusLight>
          ) : data ? (
            <Flex direction="column" gap="size-100">
              <Text>Result:</Text>
              <Heading level={2}>{data.output}</Heading>
            </Flex>
          ) : null}
        </View>
      </Flex>
    </View>
  );
}

export default RomanNumeralConverter; 