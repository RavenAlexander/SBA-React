import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>} 
      {/* Note: this is an if statement that checks if previous or next page exists before adding the button */}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
