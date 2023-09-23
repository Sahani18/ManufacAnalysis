import wineData from "./data/Wine-Data.json";

interface WineDataItem {
  Alcohol: any;
  Ash: any;
  Hue: any;
  Magnesium: any;
  Flavanoids: any;
}



const ClassWiseStatistics=()=> {
  const classData: Record<string, any[]> = {};


const calculateMean=(values: any[]): any =>{
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }
  
  const calculateMedian=(values: any[]): any =>{
    values.sort((a, b) => a - b);
    const middle = Math.floor(values.length / 2);
  
    if (values.length % 2 === 0) {
      return (values[middle - 1] + values[middle]) / 2;
    } else {
      return values[middle];
    }
  }
  
  const calculateMode=(values: any[]): any =>{
    const counts: Record<any, any> = {};
    let mode:any ;
    let maxCount = 0;
  
    for (const value of values) {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    }
  
    return mode;
  }
  
  const calculateGamma=(data: WineDataItem[]): any[]=> {
    return data.map((entry) => (entry.Ash * entry.Hue) / entry.Magnesium);
  }
  

  // Group data by the "Alcohol" class
  wineData.forEach((entry) => {
    const alcoholClass = entry.Alcohol.toString();

    if (!classData[alcoholClass]) {
      classData[alcoholClass] = [];
    }

    classData[alcoholClass].push(entry.Flavanoids);
  });

  const classGammaData: Record<string, any[]> = {};

  // Calculate "Gamma" values and group by the "Alcohol" class
  const gammaValues = calculateGamma(wineData);
  wineData.forEach((entry, index) => {
    const alcoholClass = entry.Alcohol.toString();

    if (!classGammaData[alcoholClass]) {
      classGammaData[alcoholClass] = [];
    }

    classGammaData[alcoholClass].push(gammaValues[index]);
  });

  const classNames = Object.keys(classData);

  return (
    <div className="text-black mx-auto bg-gray-100 rounded-lg shadow-md p-10 w-2/4">
      <p className="text-2xl text-fuchsia-800">Flavanoids Statistics</p>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMean(classData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMedian(classData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMode(classData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
<br/>
<br/>
      <p className="text-2xl text-fuchsia-800">Gamma Statistics</p>
      <table className="p-2 justify-center text-center items-center">
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody className="p-2 justify-center text-center items-center">
          <tr className="p-2 justify-center text-center items-center">
            <td>Gamma Mean</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMean(classGammaData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMedian(classGammaData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {classNames.map((className) => (
              <td key={className}>
                {calculateMode(classGammaData[className]).toFixed(3)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClassWiseStatistics;
