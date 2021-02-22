import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import QRCode from 'qrcode.react'
import Dialog from '../../components/dialog/dialog'
import { postWereadLoginInfo } from '../../services/weread'
import { toast } from 'react-toastify'

type WeReadLoginProps = {
}

interface WereadLoginResponse {
  uid: string
}

type WeReadQRCodeProps = {
  onSuccess: () => void
}

function WeReadQRCode(props: WeReadQRCodeProps) {
  const { data, revalidate } = useSWR<WereadLoginResponse>('/v2/weread/login')

  useEffect(() => {
    if (!data) {
      return
    }
    postWereadLoginInfo(data?.uid).then(res => {
      props.onSuccess()
    }).catch(err => {
      console.error(err)
      toast.error(err)
      revalidate()
    })
  }, [data?.uid])

  if (!data) {
    return null
  }

  return (
    <QRCode
      onClick={revalidate}
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
          <WeReadQRCode
            onSuccess={() => setVisible(false)}
          />
        </Dialog>
      )}
    </div>
  )
}

export default WeReadLogin
