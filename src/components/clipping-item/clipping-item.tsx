import React from 'react'
import { Link } from '@reach/router';
import Card from '../card/card';
import { book_book_clippings } from '../../schema/__generated__/book'
import { WenquBook } from '../../services/wenqu';
import { fetchSquareData_featuredClippings_creator } from '../../schema/__generated__/fetchSquareData';
import { useTranslation } from 'react-i18next';
import Avatar from '../avatar/avatar';
import ClippingContent from '../clipping-content';
import { IN_APP_CHANNEL } from '../../services/channel';

const styles = require('./clipping-item.css').default

type TClippingItemProps = {
  item: book_book_clippings
  book?: WenquBook
  userid: number
  inAppChannel: IN_APP_CHANNEL
  creator?: fetchSquareData_featuredClippings_creator
}

function ClippingItem({ userid, item, book, creator, inAppChannel }: TClippingItemProps) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/dash/${userid}/clippings/${item.id}?iac=${inAppChannel}`}
      key={item.id}
      className='with-slide-in block'
    >
      <Card className={styles.clipping + ' lg:p-10 p-2 hover:shadow-2xl transition-all duration-300'} style={{ margin: '1rem 0' }}>
        <h3 className='lg:text-3xl text-xl'>
          {book?.title ?? item.title}
        </h3>
        <hr className='my-4' />
        <ClippingContent content={item.content} className='lg:text-2xl text-gray-900' />
        {creator && (
          <React.Fragment>
            <hr className='my-4 self-end' />
            <div className='flex w-full justify-between'>
              <div className='flex justify-center items-center'>
                <Avatar
                  img={creator.avatar}
                  name={creator.name}
                  className='w-10 h-10 mr-4'
                />
                <span>{creator.name}</span>
              </div>
              <div>
                <span>{creator.clippingsCount} {t('app.profile.records')} </span>
              </div>
            </div>
          </React.Fragment>
        )}

      </Card>
    </Link>
  )
}

export default ClippingItem
