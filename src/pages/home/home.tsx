import React, { useState } from 'react'
import { Link } from '@reach/router'
import BooksContent from './books';
import ListFooter from '../../components/list-footer/list-footer';
import homeListQuery from '../../schema/books.graphql'
import { useQuery } from '@apollo/client';
import { books, booksVariables } from '../../schema/__generated__/books';
import { useSelector } from 'react-redux';
import { TGlobalStore } from '../../store';
import { useTranslation } from 'react-i18next';
const styles = require('./home.css')

type THomeProp = {
  userid: number
}

const STEP = 10
function HomePage(props: THomeProp) {
  const uid = useSelector<TGlobalStore, number>(s => s.user.profile.id)
  const [reachEnd, setReachEnd] = useState(false)
  const { data, fetchMore, loading, called } = useQuery<books, booksVariables>(homeListQuery, {
    variables: {
      pagination: {
        limit: STEP,
        offset: 0
      },
    }
  })
  const { t } = useTranslation()

  if (!data) {
    return (
      <div>loading</div>
    )
  }

  return (
    <section className={`${styles.home} page`}>
      <header className='flex items-center justify-center my-10'>
        <h2 className='text-center font-light text-black text-3xl dark:text-gray-200'>{t('app.home.title')}</h2>
        <Link
          to={`/dash/${uid}/unchecked`}
          className='bg-blue-400 duration-300 inline-block py-2 px-4 ml-2 transition-colors hover:bg-blue-700'
        >{t('app.home.unchecked')}</Link>
      </header>

      <div className={styles.clippings}>
        {loading && (
          <div className='my-12 mx-6'>
            loading
          </div>
        )}
        {(!loading || called) && (
          <BooksContent
            list={data.books}
            userid={props.userid}
          />
        )}
      </div>

      <ListFooter
        loadMoreFn={() => {
          if (loading) {
            return
          }
          fetchMore({
            variables: {
              pagination: {
                limit: 10,
                offset: data.books.length
              }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult || fetchMoreResult.books.length === 0) {
                setReachEnd(true)
                return prev
              }
              return {
                ...prev,
                books: [...prev.books, ...fetchMoreResult.books] as any
              }
            }
          })

        }}
        hasMore={!reachEnd}
      />
    </section>
  )

}

export default HomePage
