function OverviewCard(props) {
  return (
    <>
      <p className="h2 greyBlue">
        {props.data.icon}
        {' '}
        {props.data.value}
        kW
      </p>
      <p className="darkgray mb2">{props.data.term}</p>
    </>
  );
}
export default OverviewCard;
