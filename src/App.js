import './App.css';
import HomePage from './pages/Homepage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <HomePage isDarkTheme={false} />
    </DndProvider>
    
  );
}

export default App;
