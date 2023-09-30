import React, { useEffect, useState } from 'react'
import styles from './logcomponent.module.css'

const LogComponent = ({ logData, categorykey, categorySet }) => {

  const [selectedCategory, setSelectedCategory] = useState(parseInt(categorykey))

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  }, [categorykey])

  // console.log('logData', logData);

  return (
    <div className="d-flex justify-content-center">
      <table>
        <tbody>
          {categorySet.map(category => {
            if (category.key === selectedCategory) {
              return (
                <React.Fragment key={category.key}>
                  {logData[category.key].map((log, index) => (
                  <tr key={'log'+index}>
                      <td className='text-nowrap' >
                        <p className={`${styles.date}`}>{log.formattedDate} 
                        <small className={`${styles.time}`}>{log.formattedTime}</small>
                        </p>
                      </td>
                      <td className='text-nowrap' >
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
