import ClassWiseStatistics from "./components/wineStatics";
import "./index.css";

const App = () => {
  return (
    <div className="bg-slate-800 text-gray-300 h-screen">
      <p className="text-center text-3xl pt-8">Manufac Analytics</p>
      <br />
      <ClassWiseStatistics />
    </div>
  );
};

export default App;
