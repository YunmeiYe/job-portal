import { formatDate } from "../../utils/common"

const CertCard = (props: any) => {
  return (
    <div className="flex sm-mx:flex-wrap justify-between gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-light-cream-300 dark:bg-mine-shaft-800 rounded-md shrink-0">
          <img className="h-7" src={`/assets/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm">{props.name}</div>
          <div className="text-sm text-mine-shaft-700 dark:text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex flex-col sm-mx:flex-row sm-mx:gap-3 items-end text-sm xs-mx:text-sm text-mine-shaft-500">
        <div>Issued: {formatDate(props.issueDate)}</div>
        <div>ID: {props.certificateId}</div>
      </div>
    </div>

  )
}

export default CertCard