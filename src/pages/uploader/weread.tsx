import React, { useState } from 'react'
import useSWR from 'swr'
import QRCode from 'qrcode.react'
import Dialog from '../../components/dialog/dialog'

type WeReadLoginProps = {
}

interface WereadLoginResponse {
  uid: string
}

function WeReadQRCode() {
  const { data, error, isValidating } = useSWR<WereadLoginResponse>('/v2/weread/login')

  console.log(data, error, isValidating)

  if (!data) {
    return null
  }

  return (
    <QRCode
      className='animate__fadeInDown'
      value={`https://weread.qq.com/web/confirm?pf=2&uid=${data.uid}`}
      size={256}
    />
  )
}

function WeReadLogin(props: WeReadLoginProps) {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <button onClick={() => setVisible(true)}>we read</button>
      {visible && (
        <Dialog
          title='weread'
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <WeReadQRCode />
        </Dialog>
      )}
    </div>
  )
}

export default WeReadLogin
