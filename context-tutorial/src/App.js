import './App.css';
import ColorBox from './componenets/ColorBox';
import SelectColors from './componenets/SelectColors';
import { ColorProvider } from './contexts/colors';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
