import express from 'express';

const router = express.Router();

// GET home page.
router.get('/', (_req: any, res: any) => {
  res.render('index', { title: 'Express' });
});

export default router;
