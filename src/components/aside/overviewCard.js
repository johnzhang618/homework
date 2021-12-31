import {Fragment} from 'react'
const OverviewCard = (props) => {
    return (
        <Fragment>
            <p className="h2 greyBlue">{props.data.icon} {props.data.value}kW</p>
            <p className="darkgray mb2">{props.data.term}</p>
        </Fragment>
    );
}
export default OverviewCard
