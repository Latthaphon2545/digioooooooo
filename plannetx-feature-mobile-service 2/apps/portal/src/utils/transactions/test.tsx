import axios from 'axios'
import Swal from 'sweetalert2'
import { Dispatch } from 'redux'

interface HandleOnClickInquiryParams {
  id: string | string[] | undefined
  partnerID: string
  dispatch: Dispatch<any>
  setIsFetching: (isFetching: boolean) => void
  handleFetchTransaction: () => void
}

export const handleOnClickInquiry = async ({
  id,
  partnerID,
  dispatch,
  setIsFetching,
  handleFetchTransaction
}: HandleOnClickInquiryParams) => {
  if (!id) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Transaction ID is missing'
    })
    return
  }

  try {
    Swal.showLoading()
    const response = await axios.get(`/api/transaction/${id}/inquiry`, {
      headers: { 'x-partner-id': partnerID }
    })
    dispatch({ type: 'INQUIRY_SUCCESS', payload: response.data })
    setIsFetching(true)
    handleFetchTransaction()
    Swal.close()
  } catch (err: any) {
    setIsFetching(false)
    const message = err.response ? err.response.data.res_desc : err.message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    })
    console.error(err)
  }
}
