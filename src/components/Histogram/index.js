import React, { useEffect, useState } from "react";
import { drawChart } from "./BasicD3";
import BarChart from "./BarChart";

export default function Histogram() {
  const [histogramData, setData] = useState([]);
  const [bins, setBins] = useState([]);

  var data = [
    78.46486935, 76.90588357, 80.76324831, 97.25990112, 77.09160084,
    126.3302161, 88.08209518, 89.25754433, 88.64845462, 82.24866071,
    82.35145871, 84.83248286, 87.02300821, 82.7380426, 79.3127351, 89.13408253,
    82.00592466, 84.47335807, 89.00030153, 83.26119319, 76.59087878,
    119.3473949, 78.97189079, 86.23715274, 78.64331104, 74.86096696,
    78.30923519, 80.02067291, 78.10990364, 88.30089548, 85.53627311,
    82.54421101, 75.13926618, 89.05755856, 96.54559584, 84.12511877, 87.0845414,
    72.67025194, 79.50939512, 81.7329292, 76.74730204, 72.83609134, 93.50019684,
    77.50604933, 110.4559936, 91.41666042, 73.578206, 78.1518037, 84.71748567,
    85.25056763, 84.93006747, 87.69348806, 84.9161293, 88.81414907, 96.00329026,
    61.38742772, 109.1825602, 92.71457481, 85.22970197, 87.9033036, 80.28159914,
    87.9033036, 80.28159914, 89.46590046, 84.15562721, 67.39189853, 103.2348265,
    67.11654099, 89.1178798, 83.87306065, 91.56750773, 66.09183152, 95.07443748,
    87.65649882, 94.23966115, 96.92420735, 100.0701132, 61.31241048,
    86.69628995, 86.49861783, 83.59016758, 86.63576378, 87.23808382, 82.6931201,
    92.08128598, 83.59134285, 81.13057773, 93.78056742, 87.96746625,
    92.28976506, 84.5825825, 103.6324529, 80.25153661, 77.51035204, 78.38545979,
    80.41983489, 82.83051782, 81.11487934, 77.26310783, 83.83907131,
    74.85276366, 83.11005617, 57.95820682, 104.6031689, 62.98923389,
    68.84053351, 82.86317191, 83.2998989, 86.07490688, 91.95225671, 88.20925557,
    78.2904032, 84.41037869, 77.30120297, 81.49551439, 84.19482459, 81.15945436,
    87.16602229, 84.03185766, 85.27585023, 77.85632429, 90.09138134,
    78.82420488, 79.89914305, 82.50722774, 76.03140724, 83.31308887,
    86.16488473, 86.84636096, 60.29199663, 78.72475964, 75.27440581,
    83.30700127, 81.46065729, 83.91708678, 77.64289109, 59.29552828, 85.4635658,
    88.2862322, 84.58048138, 85.12675673, 79.85871393, 80.54527292, 74.22465312,
    89.04993059, 88.47109592, 76.84689225, 77.58954142, 82.91281419, 90.315359,
    61.40501024, 80.87260099, 87.87402895, 86.60812261, 92.04890236,
    86.77695048, 84.8009108, 88.87478812, 88.14913914, 78.6737252, 89.09827707,
    101.951529, 75.81546303, 79.03761302, 89.43535005, 80.51270113, 94.27243236,
    81.15502115, 84.29412041, 76.33078647, 80.29425792, 94.21435106,
    83.32157125, 90.98206782, 90.03749502, 93.28177978, 89.74551779,
    78.22430154, 84.03935017, 94.84421463, 81.89238654, 87.96417883,
    98.43191448, 79.62217462, 92.33109352, 94.60647462, 92.62577545,
    87.63633849, 95.73146129, 78.55098474, 83.75415342, 84.94522123,
    81.55583987, 95.68316714, 87.33168245, 85.41154021, 81.69244988,
    97.42518985, 84.57322062, 73.42510016, 94.46637195, 84.19190869,
    82.47472834, 85.59378966, 79.51461465, 76.18578346, 82.56585889,
    96.74718641, 92.24102588, 89.29755584, 108.0870971, 101.8837519,
    87.57147536, 82.18666693, 95.46187321, 86.75228403, 187.0883265,
    126.2903257, 93.92953015, 83.89277108, 107.8497961, 86.18801385,
    93.54548188, 81.88776111, 84.34656184, 84.34656184, 81.03734451,
    83.23469319, 89.55243221, 86.9417897, 79.61134877, 79.45990814, 86.12574174,
    79.97555008, 81.75093612, 128.5504611, 118.0386686, 104.523519, 93.92414067,
    80.38215459, 106.6244863, 106.6244863, 111.7945839, 79.07869114,
    93.94151378, 81.53801491, 86.04512359, 89.04993948, 86.42006901,
    83.45770771,
  ];

  // for (var i = 1; i <= 400; i++) {
  //   foo.push(i);
  // }
  console.log(data.filter((num) => (num <= 90) & (num >= 85)));

  useEffect(() => {
    var BinSize = 5;

    //Don't Modify Code Below
    var hisData = histogram(data, BinSize);
    setData(hisData);

    let min = Infinity;
    let max = -Infinity;

    for (const item of data) {
      if (item < min) min = item;
      else if (item > max) max = item;
    }
    console.log(min);
    var StartValue = Math.ceil(min / BinSize) * BinSize;
    console.log(StartValue);
    console.log(hisData);

    var bins = hisData.map(function (data, i) {
      return i * BinSize + StartValue;
    });
    console.log(bins);

    setBins(bins);
  }, []);

  //var histogramBuckets = [];

  // Other alternative is to use d3.js

  function histogram(data, size) {
    let min = Infinity;
    let max = -Infinity;

    for (const item of data) {
      if (item < min) min = item;
      else if (item > max) max = item;
    }

    const bins = Math.ceil((max - min + 1) / size);

    const histogram = new Array(bins).fill(0);

    for (const item of data) {
      //Changed from floor to ceil to get correct histogram according to Johns excel
      //console.log(size);
      //console.log(min);
      var StartValue = Math.ceil(min / size) * size;
      histogram[Math.floor((item - (StartValue - size)) / size)]++;

      // histogram[Math.round((item - StartValue) / size)]++;
    }

    return histogram;
  }

  return (
    <div>
      <div className="histogram">
        <h2>Graphs with React</h2>
        <div id="chart"></div>
        {bins.length > 0 ? (
          <BarChart
            width={bins.length * 50}
            height={400}
            data={histogramData}
            bins={bins}
          />
        ) : null}
      </div>
    </div>
  );
}
