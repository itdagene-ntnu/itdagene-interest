import { createRoot } from 'react-dom/client';
import './index.css';
import Render from './render';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Could not find the #root element in index.html');
}

createRoot(container).render(<Render />);
