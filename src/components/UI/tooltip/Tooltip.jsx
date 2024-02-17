import classes from './tooltip.module.css';

const Tooltip = ({setShow}) => {
  return (
    <div
      className={classes.tooltip}
      onMouseOut={() => setShow(false)}
    >
      You can drag
    </div>
  )
}

export default Tooltip;