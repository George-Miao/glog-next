import { defineFC } from '@core/helper'

const Oops = defineFC(() => {
  return (
    <p className='relative z-100 oops'>
      OOPS
      <style jsx>
        {`
          .oops::after {
            content: '_';
            animation: blinker 1s cubic-bezier(1, 0, 0, 1) infinite;
          }

          @keyframes blinker {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </p>
  )
})

export default Oops
