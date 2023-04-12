import React, { useEffect, useState }from 'react';

const InputDropdownRow = ({ options, selectedValue, handleChange, handleDelete, reset  }) => {
  const [value, setValue] = useState(selectedValue);

  useEffect(() => {
      if (reset) {
          setValue('');
          handleChange({ target: { value: '' } });
      }
  }, [reset]);

    return (
        <div className="row categoryMargin">
      <div className="col-1">
        </div>
        <div className="col-10 form-group">
          <select
            className="form-control"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleChange(e);
          }

            }
          >
            <option defaultValue="">Choose...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
              
            ))}
          </select>
         
        </div>
        <div className="col-1">
        <button className="btn btn-danger" onClick={handleDelete}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-x-fill" viewBox="0 0 16 16">
                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 7.793 1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708L8 9.293Z" />
                </svg>
          </button>
          </div>
      </div>
    );
}

export default InputDropdownRow;
