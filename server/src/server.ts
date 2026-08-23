import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.use(cors({ origin: 'http://localhost:5173' }));
    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) { 
    console.error("Unable to connect to database: ", error);
    process.exit(1);
  }
}

startServer(); 