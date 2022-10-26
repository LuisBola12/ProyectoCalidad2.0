import { React, useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { getPayrrollStatistics } from "../../Utils/PayrollProjects/getPayrrollStatistics";
import { sumTotalSalaries } from "../../Utils/PayRollReport/sumTotalSalarys";
import { LineChart } from './../Plots/LineChartPlot';

export const PayrrollGraphic = () => {
  const user = useSelector((state) => state.user.user);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [infoReceived, setInfoReceived] = useState(false);
  const [payrrollLabels, setPayrrollLabels] = useState([]);
  const [payrrollData, setPayrrollData] = useState([]);
  useEffect(() => {
    const getStatistics = async () => {
      const data = await getPayrrollStatistics(user.Cedula, activeProject);
      if (data) {
        let labels = [];
        let dataValues = [];
        data.slice(0,5).reverse().forEach((element) => {
          labels.push(element.Consectivo);
          dataValues.push(element.Salarios + element.Pagos+ element.Beneficios);
        });
        setPayrrollLabels(labels);
        setPayrrollData(dataValues);
        setInfoReceived(true);
      }
    };
    getStatistics();
  }, []);

  return !infoReceived ? <div className='loader' ></div > : (
    <div className='voluntaryDeductions-graphic-container'>
      <h3>Last 5 Payrrolls Made</h3>
      {payrrollLabels.length > 0 && payrrollData.length >0 ? 
       <LineChart
        dataLabels={payrrollLabels}
        dataValues= {payrrollData}
      />
      :<>
        <label className='Empty-message' style={{marginTop: 'auto'}}> No Payrrolls made yet </label>
      </>
      
    }
    </div>    
    
  )
}