
import React, { useCallback, useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import AV from 'leancloud-storage'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type BindPhoneProps = {
  onFinalCheck(phone: string, code: string): Promise<any>
}

function BindPhone(props: BindPhoneProps) {
  const [pn, setPn] = useState('')
  const [capture, setCapture] = useState<AV.Captcha | null>(null)
  const [smsSent, setSmsSent] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')
  const [code, setCode] = useState('')
  const { t } = useTranslation()

  const onPhoneNumberFinish = useCallback(() => {
    // 还没输入，直接干掉好了
    if (pn.length < 3) {
      return
    }
    if (pn.length < 5 || pn.length > 16) {
      toast.error(t('app.auth.errors.pnLen'))
      return
    }
    AV.Captcha.request().then(res => {
      setVerifyCode('')
      setCapture(res)
    })
  }, [pn])
  const onVerifyCodeInputEnd = useCallback(() => {
    if (pn.length < 5 || pn.length > 16) {
      toast.error(t('app.auth.errors.pnLen'))
      return
    }
    if (verifyCode.length !== 4) {
      toast.error(t('app.auth.errors.verifyCodeLen'))
      return
    }
    capture?.verify(verifyCode).then(vt => {
      // send verify code
      AV.Cloud.requestSmsCode({
        mobilePhoneNumber: pn,
      }, {
        validateToken: vt
      }).then(res => {
        // something
        toast.success('app.auth.info.smsSent')
        // redirect
        setSmsSent(true)
      }).catch(err => {
        toast.error(err.toString())
      })
    }).catch(err => {
      toast.error(err.toString())
      setVerifyCode('')
      onPhoneNumberFinish()
    })
  }, [capture, verifyCode, onPhoneNumberFinish])
  const onCodeEnd = useCallback((e: any) => {
    if (!smsSent) {
      return
    }

    const code: string = e.target.value
    if (code.length != 6) {
      toast.error(t('app.auth.errors.codeLen'))
      return
    }

    props
      .onFinalCheck(pn, code)
      .catch(err => {
        console.error(err)
        toast.error(err.toString())
      })

  }, [smsSent])

  return (
    <div className='w-full flex items-center justify-center rounded flex-col'>
      <PhoneInput
        country='cn'
        preferredCountries={['cn']}
        value={pn}
        // 不知道手机号长度是多少，不能直接校验
        onChange={v => { setPn(v) }}
        onEnterKeyPress={onPhoneNumberFinish}
        onBlur={onPhoneNumberFinish}
        autoFormat={false}
        inputStyle={{
          width: '100%'
        }}
      />
      <div className='flex w-full flex-col'>
        {capture && (
          <div className='flex mt-4'>
            <img src={capture?.url} />
            <input
              value={verifyCode}
              onChange={e => setVerifyCode(e.target.value.trim())}
              maxLength={4}
              onBlur={onVerifyCodeInputEnd}
              className='w-full py-2 px-4 focus:outline-none'
            />
          </div>
        )}
        {smsSent && (
          <input
            type='text'
            value={code}
            onChange={e => {
              const val = e.target.value.trim()
              setCode(val)
              if (val.length === 6) {
                onCodeEnd(e)
              }
            }}
            placeholder={t('app.auth.code.placeholder')}
            maxLength={6}
            onBlur={onCodeEnd}
            className='w-full mt-4 py-2 px-4 focus:outline-none'
          />
        )}
      </div>

    </div>
  )
}

export default BindPhone
