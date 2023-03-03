import React, { useState, useEffect } from 'react';
import "../sass/customers.scss";
import Table from '../components/Table';
import customerList from "../assets/JsonData/customers-list.json";
import Loading from '../components/Loading';

const customerTableHead = [
  '',
  'name',
  'email',
  'phone',
  'total orders',
  'total spend',
  'location'
];

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
);

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
  </tr>
)

function Customers() {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <div className="customer__page">
      <h2 className="page--header">
        customers
      </h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table 
                headData={customerTableHead}
                bodyData={customerList}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                renderBody={(item, index) => renderCustomerBody(item, index)}
                limit="10"
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customers;
