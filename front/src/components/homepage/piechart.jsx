import React from 'react'
import PieChart from 'react-minimal-pie-chart';



const Pie = ( ) => {

   
    return (
        <PieChart
        data={[
          { title: 'Food', value: 10, color: '#E38627' },
          { title: 'Entertainment', value: 15, color: '#C13C37' },
          { title: 'Utility', value: 20, color: '#6A2135' },
          { title: 'Other', value: 30, color: '#8A2535' },
        ]}
      />
    )
}


  

export default Pie
