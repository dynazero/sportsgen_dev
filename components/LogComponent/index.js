import React, { useEffect, useState } from 'react'
import styles from './logcomponent.module.css'

const LogComponent = ({ logData, categorykey, categorySet }) => {

  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey))

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])

  // console.log('logData', logData);

  return (
    <div className={`${styles.logContainer}`}>
      <table className={`${styles.tableContainer}`}>
        <tbody>
          {categorySet.map(category => {
            if (category.key === selectedCategory) {
              return (
                <React.Fragment key={category.key}>
                  {logData[category.key].map((log, index) => (
                  <tr key={'log'+index}  className={`${styles.trContainer}`}>
                      <td className={`text-nowrap `} >
                        <p>
                        <small className={`${styles.date}`}>
                          {log.formattedDate} 
                        </small>
                        <small className={`${styles.time}`}>
                          <strong>
                          {log.formattedTime}
                          </strong>
                        </small>
                        </p>
                      </td>
                      <td className={`text-nowrap `} >
                        <p className={`${styles.logText}`}>{log.message} <small className={`${styles.logAuthor}`}>{log.logAccount}</small></p>
                      </td>
                  </tr>
                    ))}
                </React.Fragment>
              )
            } else {
              return null;
            }
          })}
        </tbody>
      </table>

    </div>
  )
}

export default LogComponent;
