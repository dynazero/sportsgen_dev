import React from 'react'
import styles from './org.module.css'

export default function UpComingEvents({ upcomingEvents, liveTournaments }) {


  return (
    <>
      <div className='p-2'>
        {/* <strong className="mb-2 text-primary">Posted Events:</strong> */}
        <div className={`btn-group  btn-group-sm ${styles.width100}`} id="pills-tab" role="tablist" aria-label="Basic mixed styles example">
          <button className={`btn btn-primary disabled ${styles.headerNav}`} id="pills-live-tab" data-bs-toggle="pill" data-bs-target="#pills-live" type="button" role="tab" aria-controls="pills-live" aria-selected="false">Posted Events:</button>
          <button className="btn btn-warning active" id="pills-up-tab" data-bs-toggle="pill" data-bs-target="#pills-up" type="button" role="tab" aria-controls="pills-up" aria-selected="true">Upcoming Events</button>
          <button className="btn btn-danger " id="pills-live-tab" data-bs-toggle="pill" data-bs-target="#pills-live" type="button" role="tab" aria-controls="pills-live" aria-selected="false">Live</button>
          <button className="btn btn-success" id="pills-joined-tab" data-bs-toggle="pill" data-bs-target="#pills-joined" type="button" role="tab" aria-controls="pills-joined" aria-selected="false">Joined Events</button>

        </div>
      </div>


      <div className="p-2 list-group">
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade" id="pills-live" role="tabpanel" aria-labelledby="pills-live-tab">
            {(!liveTournaments || !liveTournaments.length) && <div>No Live Tournaments as of the moment</div>}
            {liveTournaments &&
              liveTournaments.map((item, i) => (


                <a href="#" key={i} className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.eventName}</h5>
                    <small style={{ whiteSpace: 'nowrap' }}>3 days ago</small>
                  </div>
                  <p className="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </a>
              ))}
          </div>
          <div className="tab-pane fade show active" id="pills-up" role="tabpanel" aria-labelledby="pills-up-tab">
            {(!upcomingEvents || !upcomingEvents.length) && <div>No Upcoming Events</div>}
            {upcomingEvents &&
              upcomingEvents.map((item, i) => (


                <a href="#" key={i} className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{item.eventName}</h5>
                    <small style={{ whiteSpace: 'nowrap' }}>3 days ago</small>
                  </div>
                  <p className="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </a>
              ))}

          </div>
          <div className="tab-pane fade" id="pills-joined" role="tabpanel" aria-labelledby="pills-joined-tab">
            Joined Events
          </div>
        </div>
      </div>
    </>
  )
}
