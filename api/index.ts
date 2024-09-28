import express from 'express';
import { init, getHeadlines } from './persistence/mysql';
const app = express();
const port = 3000;

app.listen(port, async() => {
  await init(port)
  console.log(`Server running at http://localhost:${port}`);
  const headlines = await getHeadlines('Another_Debate_2024');
  console.log(headlines);
});

app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});