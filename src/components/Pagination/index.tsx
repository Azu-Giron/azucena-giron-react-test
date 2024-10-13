import React, { useEffect, useState } from 'react'
import { Dots, PaginationInterface } from '../../data/interfaces/pagination.interface';
type props = {
  pagination: PaginationInterface;
  paginate: (index: number) => void
}

export const Pagination: React.FC<props> = (props) => {
  const { pagination, paginate } = props;
  const [numberOfButtons, setNumberOfButtons] = useState<number>(0)
  const [startPageValue, setStartPageValue] = useState<number>(0)
  const [dots, setDots] = useState<Dots>({ start: false, end: false })

  useEffect(() => {
    if (pagination.total < 1 || pagination.pageSize < 1) {
      setNumberOfButtons(0)
      setDots({ start: false, end: false })
      return
    }
    const pageTotal = Math.ceil(pagination.total / pagination.pageSize)
    if (pageTotal <= 5) {
      setNumberOfButtons(pageTotal)
      setDots({ start: false, end: false })
      return
    }

    setNumberOfButtons(5)
    if (pagination.page < 3) {
      setStartPageValue(0)
      setDots({ start: false, end: true })
    } else if (pagination.page >= pageTotal - 3) {
      setStartPageValue(pageTotal - 5)
      setDots({ start: true, end: false })
    } else {
      setStartPageValue(pagination.page - 2)
      setDots({ start: true, end: true })
    }

  }, [pagination])
  return (
    <div className='pagination'>
      {dots.start ? "..." : ""}
      {Array.from({ length: numberOfButtons }, (_, index) => <button className={pagination.page === index + startPageValue ? "selected" : ""} key={index} onClick={() => paginate(index + startPageValue)}>{index + startPageValue + 1}</button>)}
      {dots.end ? "..." : ""}
    </div>
  )
}
