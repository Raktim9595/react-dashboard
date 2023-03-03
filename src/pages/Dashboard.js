import React, { useState, useEffect, useRef } from 'react';
import "../sass/dashboard.scss";
import Table from '../components/Table';
import Badge from '../components/Badge';

import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCards from '../components/StatusCards';
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const chartOptions = {
  series: [{
      name: 'Online Customers',
      data: [40,70,20,90,36,80,30,91,60]
  }, {
      name: 'Store Customers',
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
  }],
  options: {
      color: ['#6ab04c', '#2980b9'],
      chart: {
          background: 'transparent'
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth'
      },
      xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      legend: {
          position: 'top'
      },
      grid: {
          show: false
      }
  }
}

const topCustomers = {
  head: [
      'user',
      'total orders',
      'total spending'
  ],
  body: [
      {
          "username": "john doe",
          "order": "490",
          "price": "$15,870"
      },
      {
          "username": "frank iva",
          "order": "250",
          "price": "$12,251"
      },
      {
          "username": "anthony baker",
          "order": "120",
          "price": "$10,840"
      },
      {
          "username": "frank iva",
          "order": "110",
          "price": "$9,251"
      },
      {
          "username": "anthony baker",
          "order": "80",
          "price": "$8,840"
      }
  ]
};

const latestOrders = {
  header: [
      "order id",
      "user",
      "total price",
      "date",
      "status"
  ],
  body: [
      {
          id: "#OD1711",
          user: "john doe",
          date: "17 Jun 2021",
          price: "$900",
          status: "shipping"
      },
      {
          id: "#OD1712",
          user: "frank iva",
          date: "1 Jun 2021",
          price: "$400",
          status: "paid"
      },
      {
          id: "#OD1713",
          user: "anthony baker",
          date: "27 Jun 2021",
          price: "$200",
          status: "pending"
      },
      {
          id: "#OD1712",
          user: "frank iva",
          date: "1 Jun 2021",
          price: "$400",
          status: "paid"
      },
      {
          id: "#OD1713",
          user: "anthony baker",
          date: "27 Jun 2021",
          price: "$200",
          status: "refund"
      }
  ]
};

const orderStatus = {
  "shipping": "primary",
  "pending": "warning",
  "paid": "success",
  "refund": "danger"
}

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
)

function Dashboard() {
  const { mode } = useSelector(state => state.ThemeReducer);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, []);

  if(isLoading) {
    return (
      <Loading />
    )
  } else {
    return (
      <div className="dashboard">
        <h2 className="page--header">
          Dashboard
        </h2>
        <div className="row">
          <div className="col-5">
            <div className="row">
              {
                statusCards.map(({icon, count, title}, index) => (
                  <div  key={index} className="col-6">
                    {title}
                    <StatusCards icon={icon} count={count} title={title}  />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="col-7">
            <div className="card full-height">
              <Chart 
                options={mode === 'theme-mode-dark' ? {
                  ...chartOptions.options,
                  theme: { mode: "dark" }
                } : {
                  ...chartOptions.options,
                  theme: { mode: "light" }
                }}
                series={chartOptions.series}
                type="line"
                height="100%"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card__header">
                <h3>our top customers</h3>
              </div>
              <div className="card__body">
                <Table
                  headData={topCustomers.head}
                  renderHead={(item, index) => renderCustomerHead(item, index)}
                  bodyData={topCustomers.body}
                  renderBody={(item, index) => renderCustomerBody(item, index)}
                ></Table>
              </div>
              <div className="card__footer">
                <Link to="/">
                  View all Users
                </Link>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card">
              <div className="card__header">
                <h3>latest orders</h3>
              </div>
              <div className="card__body">
                <Table
                  headData={latestOrders.header}
                  bodyData={latestOrders.body}
                  renderHead={(item, index) => renderOrderHead(item, index)}
                  renderBody={(item, index) => renderOrderBody(item, index)}
                />
              </div>
              <div className="card__footer">
                <Link to="/" >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard

