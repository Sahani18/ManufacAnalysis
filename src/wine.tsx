import wineData from "./data/Wine-Data.json";

//define the structure or shape of an object
interface WineDataItem {
  Alcohol: any;
  Ash: any;
  Hue: any;
  Magnesium: any;
  Flavanoids: any;
}

const ClassWiseStatistics = () => {
  // contains data for flavanoids
  const classData: Record<string, any[]> = {};

  // calculate mean
  const calculateMean = (values: any[]): any => {
    //we are parsing to float coz in the array there is a string due to which NaN is coming in output
    const sum = values.reduce((acc, val) => acc + parseFloat(val), 0);
    return sum / values.length;
  };

  // calculate median
  const calculateMedian = (values: any[]): any => {
    values.sort((a, b) => a - b);
    const middle = Math.floor(values.length / 2);

    if (values.length % 2 === 0) {
      return (values[middle - 1] + values[middle]) / 2;
    } else {
      return values[middle];
    }
  };

  // calculate mode
  const calculateMode = (values: any[]): any => {
    // record is used to store counts for each value in values.
    const counts: Record<any, any> = {};
    let mode: any;
    let maxCount = 0;

    for (const value of values) {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    }

    return mode;
  };

  const calculateGamma = (data: WineDataItem[]): any[] => {
    return data.map((entry) => (entry.Ash * entry.Hue) / entry.Magnesium);
  };

  // Group data by the "Alcohol" class
  wineData.forEach((entry) => {
    const alcoholClass = entry.Alcohol.toString();

    if (!classData[alcoholClass]) {
      classData[alcoholClass] = [];
    }

    classData[alcoholClass].push(entry.Flavanoids);
  });

  // contains data for gamma
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
      <p className="text-2xl text-fuchsia-800 font-semibold">
        Flavanoids Statistics
      </p>
      <br />
      <div className="grid grid-cols-4 gap-[1px] bg-black border-black border">
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">Measure</p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-gray-300">
            <p className="text-center text-gray-900 font-semibold">
              Class {className}
            </p>
          </div>
        ))}

        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">
            Flavanoid Mean
          </p>
        </div>
        {classNames.map((className) => {
          return (
            <div key={className} className="bg-yellow-100">
              <p className="text-center text-gray-700 ">
                {calculateMean(classData[className]).toFixed(3)}
              </p>
            </div>
          );
        })}
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">
            Flavanoid Median
          </p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-yellow-100">
            <p className="text-center text-gray-700 ">
              {calculateMedian(classData[className]).toFixed(3)}
            </p>
          </div>
        ))}
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">
            Flavanoid Mode
          </p>
        </div>
        {classNames.map((className) => {
          return (
            <div key={className} className="bg-yellow-100">
              <p className="text-center text-gray-700 ">
                {calculateMode(classData[className]).toFixed(3)}
              </p>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <p className="text-2xl text-fuchsia-800 font-semibold">
        Gamma Statistics
      </p>
      <br />
      <div className="grid grid-cols-4 gap-[1px] bg-black border border-black  ">
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold ">Measure</p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-gray-300">
            <p className="text-center text-gray-900 font-semibold">
              Class {className}
            </p>
          </div>
        ))}

        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">Gamma Mean</p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-yellow-100">
            <p className="text-center text-gray-700 ">
              {calculateMean(classGammaData[className]).toFixed(3)}
            </p>
          </div>
        ))}
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">
            Gamma Median
          </p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-yellow-100">
            <p className="text-center text-gray-700 ">
              {calculateMedian(classGammaData[className]).toFixed(3)}
            </p>
          </div>
        ))}
        <div className="bg-gray-300">
          <p className="text-center text-gray-900 font-semibold">Gamma Mode</p>
        </div>
        {classNames.map((className) => (
          <div key={className} className="bg-yellow-100">
            <p className="text-center text-gray-700 ">
              {calculateMode(classGammaData[className]).toFixed(3)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassWiseStatistics;
