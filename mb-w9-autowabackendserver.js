const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

app.post('/submit-answer', (req, res) => {
    const { questionId, userAnswer } = req.body;

    // Placeholder for the correct answer check
    const correctAnswer = getCorrectAnswerFromDatabase(questionId); // Implement this function
    const isCorrect = correctAnswer === userAnswer;
    
    let responseMessage;
    if (isCorrect) {
        responseMessage = "Correct!";
    } else {
        responseMessage = "Incorrect. Try again!";
    }

    res.json({ correct: isCorrect, message: responseMessage });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function getCorrectAnswerFromDatabase(questionId) {
    // Placeholder function - implement database logic here
    // For example, assuming correct answer is always 42
    return 42;
}
