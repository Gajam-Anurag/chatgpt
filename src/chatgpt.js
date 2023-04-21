import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

function ChatGptInterface() {
  const [inputValuesWithAnswers, setInputValuesWithAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const sendData = async () => {
    setLoading(true);
    const configuration = new Configuration({
      organization: 'org-YqgkUXIlLCzIWw5EoCsMjM16',
      apiKey: '',
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'davinci:ft-personal:gajam-anurag-2023-04-21-07-07-46',
      prompt: inputValue + '->',
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data);
    const answer = response.data.choices[0].text;
    setInputValuesWithAnswers([
      ...inputValuesWithAnswers,
      { input: inputValue, answer },
    ]);
    setInputValue('');
    setLoading(false);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="96%"
      marginLeft="1%"
      borderRadius={2}
      backgroundColor="#E5E7E8"
      marginTop={1}
      p={2}
      height="90vh"
    >
      <Typography sx={{ fontSize: '30px' }}>
        ChatGpt - California Driver's License
      </Typography>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        height="90%"
        overflow="auto"
      >
        {inputValuesWithAnswers.map((inputValueWithAnswer, index) => (
          <Box>
            <Typography
              sx={{
                textAlign: 'left',
                p: 1,
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              {inputValueWithAnswer.input}
            </Typography>
            <Typography sx={{ textAlign: 'left', p: 1 }}>
              {inputValueWithAnswer.answer}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Box display="flex">
        <TextField
          sx={{ width: '94%' }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          variant="outlined"
          sx={{ marginLeft: '0.5%' }}
          onClick={sendData}
        >
          Send
        </Button>
        {loading && <CircularProgress sx={{ marginLeft: '0.5%' }} />}
      </Box>
    </Box>
  );
}

export default ChatGptInterface;
