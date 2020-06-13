import React from 'react'
import { useQuery } from '@apollo/client'
import { useTable, Row } from 'react-table'
import homelessBooksQuery from '../../schema/homeless-books.graphql'
import { GraphqlQueryBookData, GraphqlQueryBook } from '../../services/type'
import Card from '../../components/card/card'
import HomelessBookSyncInput from './sync-input'

const homelessBookColumn = [
  {
    Header: 'Name',
    accessor: 'name', // accessor is the "key" in the data
  },
]


type homelessBookTableItem = {
  name: string
}

function HomelessBookTableRow({ row }: { row: Row<homelessBookTableItem> }) {
  return (
    <tr {...row.getRowProps()} key={row.id}>
      {row.cells.map(cell => {
        return (
          <React.Fragment key={cell.row.id}>
            <td {...cell.getCellProps()} className='border-gray-300 border-2 p-4 text-lg' key={0}>{cell.render("Cell")}</td>
            <td {...cell.getCellProps()} className='border-gray-300 border-2 p-4 text-lg' key={1}>
              <HomelessBookSyncInput bookName={cell.value} />
            </td>
          </React.Fragment>
        )
      })}
    </tr>
  )
}

function AdminPanel() {
  const { data, loading } = useQuery<GraphqlQueryBookData>(homelessBooksQuery)
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups
  } = useTable<homelessBookTableItem>({
    data: data?.book.homeless.map(x => ({ name: x } as homelessBookTableItem)) || ([] as homelessBookTableItem[]),
    columns: homelessBookColumn as any
  })

  return (
    <div>
      <Card>
        <h3 className='text-3xl mb-8 text-center'>无家可归的书目们</h3>
        {data ? (
          <table {...getTableProps()} className='table-fixed w-full'>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className='border-gray-300 border-2 p-4 text-lg'>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (<HomelessBookTableRow row={row} key={row.id} />)
              })}
            </tbody>
          </table>
        ) : (
            loading ? (<span>loading</span>) : (<span>no more</span>)
          )}
      </Card>
    </div>
  )
}

export default AdminPanel
