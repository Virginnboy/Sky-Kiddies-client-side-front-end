import { useQuery } from "@tanstack/react-query"
import { fetchBankDetails } from "../store/util"
import Loading from "../components/Loading";

export const PaymentDetails = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bankAccount"],
    queryFn: fetchBankDetails
  });

  if (isLoading) {
    return <Loading/>
  }


  return (
    <div className="payment-details-container">
      <header>
        <h1>Payment Details</h1>

        <b>Kindly make payment to the account details bellow and uplaod the receipt</b>

        <main>
          <ul>
            {data?.map(acct=> <li key = {acct._id}>
              <h3>Bank Name: {acct.bankName}</h3>
              <h5>Account Name: {acct.accountName}</h5>
              <p>Account No: <b>{acct.accountNumber}</b></p>
              <p>Account Type: {acct.accountType}</p>
            </li>)}
          </ul>
        </main>
      </header>
    </div>
  )
}
