import Image from 'next/image'

//icon
import IconLawliveryApp from '../../assets/logo/lawlivery_app.svg'
import IconGooglePlay from '../../assets/logo/google_play.svg'
import IconAppleStore from '../../assets/logo/apple_store.svg'
import IconLinkedin from '../../assets/logo/linkedin.svg'
import IconFacebook from '../../assets/logo/facebook.svg'
import IconTwitter from '../../assets/logo/twitter.svg'

export default function LawliveryApp() {
  return (
    <div>
      <div className='row'>
        <Image src={IconLawliveryApp} />
      </div>
      <div>
        <Image src={IconGooglePlay} />
        <Image src={IconAppleStore} />
      </div>
      <div>
        <Image src={IconLinkedin} />
        <Image src={IconFacebook} />
        <Image src={IconTwitter} />
      </div>
    </div>
  )
}