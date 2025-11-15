export default function SizeIndicator() {
  const className = 'hidden absolute'
  return (
    <>
      <span className={`lt-sm:inline-block ${className}`}>{'lt-sm'}</span>
      <span className={`at-sm:inline-block ${className}`}>SM</span>
      <span className={`at-md:inline-block ${className}`}>MD</span>
      <span className={`at-lg:inline-block ${className}`}>LG</span>
      <span className={`at-xl:inline-block ${className}`}>XL</span>
      <span className={`at-xl:inline-block ${className}`}>XL</span>
      <span className={`at-2xl:inline-block ${className}`}>2XL</span>
      <span className={`>2xl:inline-block ${className}`}>{'>2XL'}</span>
    </>
  )
}
