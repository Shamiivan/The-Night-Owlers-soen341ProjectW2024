import { Image } from 'next/image';

export default function CardIconsList({ type }) {
  if (`${type === 'unvalid'}`) {
    return (
      <div>
        <ul className="CardPaymentForm-CardIcons">
          <li >
            <Image
              src="/amex.png"
              alt="Amex"
              width={40}
              height={40}
            />
          </li>
          <li >
            <Image
              src="/jcb.png"
              alt="JCB"
              width={40}
              height={40}
            />
          </li>
          <li>
            <Image 
              src="/mastercard.png"
              alt="MasterCard"
              width={40}
              height={40}
            />
          </li>
          <li>
            <Image
              src="/visa.png"
              alt="VISA"
              width={40}
              height={40}
            />
          </li>
        </ul>
      </div>
    )
  }

  return (
    <ul className="CardPaymentForm-CardIcons">
      <li className={`${type === 'amex' && 'active'}`}>
        <Image
          src="/amex.png"
          alt="Amex"
          width={40}
          height={40}
        />
      </li>
      <li className={`${type === 'jcb' && 'active'}`}>
        <Image
          src="/jcb.png"
          alt="JCB"
          width={40}
          height={40}
        />
      </li>
      <li className={`${type === 'mastercard' && 'active'}`}>
        <Image 
          src="/mastercard.png"
          alt="MasterCard"
          width={40}
          height={40}
        />
      </li>
      <li className={`${type === 'visa' && 'active'}`}>
        <Image
          src="/visa.png"
          alt="VISA"
          width={40}
          height={40}
        />
      </li>
    </ul>
  );
}
