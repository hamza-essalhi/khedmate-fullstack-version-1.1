import React from 'react'
import TabelRow from './TabelRow'

export const Table = ({data}) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TabelRow/>
        </tbody>
      </table>
    </div>
  )
}
