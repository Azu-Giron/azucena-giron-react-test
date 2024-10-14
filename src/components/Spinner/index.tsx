import React from 'react'

type Props = {
  isLoading: boolean;
};
const Spinner: React.FC<Props> = (props) => {
  const { isLoading } = props;
  return (<>
    {isLoading && <div className='spinner'></div>}
  </>
  )
}
export default Spinner;