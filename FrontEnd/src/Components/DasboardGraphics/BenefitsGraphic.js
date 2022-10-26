import { React, useState, useEffect } from "react";
import { DoughnutPlot } from '../Plots/DoughnutPlot'
import { useSelector } from "react-redux";
import { getBenefitsStatistics } from "../../Utils/Benefits/getBenefitsStatistics";

export const BenefitsGraphic = () => {
  const user = useSelector((state) => state.user.user);
  const activeProject = useSelector((state) => state.activeProject.projectName);
  const [infoReceived, setInfoReceived] = useState(false);
  const [benefitsLables, setBenefitsLables] = useState([]);
  const [benefitsData, setBenefitsData] = useState([]);
  useEffect(() => {
    const getStatistics = async () => {
      const data = await getBenefitsStatistics(user.Cedula, activeProject);
      if (data) {
        let labels = [];
        let dataValues = [];
        data.forEach((element) => {
          labels.push(element.Nombre);
          dataValues.push(element.empleados);
        });
        setBenefitsLables(labels);
        setBenefitsData(dataValues);
        setInfoReceived(true);
      }
    };
    getStatistics();
  }, []);

  return !infoReceived ? <div className='loader' ></div > : (
    <div className='benefit-graphic-container'>
      <h3> Benefits Selected By Employees</h3>
      {benefitsLables.length > 0 && benefitsData.length >0 ? 
       <DoughnutPlot
        dataLabels={benefitsLables}
        dataValues= {benefitsData}
      />
      :<>
        <label className='Empty-message' style={{marginTop: 'auto'}}> No benefits selected by employees yet </label>
      </>
      
    }
    </div>    
    
  )
}
