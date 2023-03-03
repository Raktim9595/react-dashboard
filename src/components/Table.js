import React, { useState } from 'react';
import "../sass/table.scss";

function Table(props) {
  const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0,Number(props.limit)) : props.bodyData;
  const [dataShow, setdataShow] = useState(initDataShow);
  let pages = 1;
  let range = [];
  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page+1;
    range=[...Array(pages).keys()];
  }
  const [currPage, setcurrPage] = useState(0)

  const selectPage = page => {
    const start = page * Number(props.limit);
    const end = start + Number(props.limit);
    setdataShow(props.bodyData.slice(start, end));
    setcurrPage(page);
  }

  return (
    <div>
      <div className="table__container">
        <table>
            {
              props.headData && props.renderHead ? (
                <thead>
                  <tr>
                    {
                      props.headData.map((item, index) => props.renderHead(item, index))
                    }
                  </tr>
                </thead>
              ) : null
            }
            {
              props.bodyData && props.renderBody ? (
                <tbody>
                  {
                    dataShow.map((item, index) => props.renderBody(item, index))
                  }
                </tbody>
              ) : null
            }
       </table>
      </div>
      <div className="table__pagination">
      {
        pages > 1 ? (
          range.map(((item, index) => (
            <div key={index} onClick={() => selectPage(index)} className={`table__pagination--item ${ currPage === index ? 'active':'' }`} >
              { item+1 }
            </div>
          )))
        ) : null
      }
      </div>
    </div>
  )
}

export default Table;
