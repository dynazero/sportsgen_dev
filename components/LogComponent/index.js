import React, { useEffect, useState } from 'react'
import styles from './logcomponent.module.css'

const LogComponent = ({ logData, categorykey, categorySet }) => {

  const[selectedCategory, setSelectedCategory] = useState(parseInt(categorykey))

  useEffect(() => {
    setSelectedCategory(parseInt(categorykey))
  },[categorykey])


  return (
    <div className="d-flex justify-content-center">
      {categorySet.map(category => {
        if (category.key === selectedCategory) {
          return (
            <div key={category.key}>
              {logData[category.key].map((log, index) => (
            <div className='text-nowrap' key={index}>
              <p className={`${styles.logText}`}>{log.message} <small className={`${styles.logAuthor}`}>{log.logAccount}</small></p>  
            </div>
          ))}
            </div>
          )
        } else {
          return null;
        }
      })}
    </div>
  )
}

export default LogComponent;
