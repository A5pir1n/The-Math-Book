const OPENAI_API_KEY = '<YOUR_API_KEY>'; //need to register

async function askChatGPT() {
  const question = document.getElementById('question').value;
  const prompt = `Q: ${question}\nA:`;
  const completions = await openai.complete({
    engine: 'text-davinci-002',
    prompt: prompt,
    maxTokens: 1024,
    n: 1,
    stop: '\n',
    temperature: 0.5,
  });
  const answer = completions.choices[0].text.trim();
  document.getElementById('answer').innerHTML = answer;
}
const openai = new OpenAI(OPENAI_API_KEY);