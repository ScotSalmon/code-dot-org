import color from "../../util/color";

export const ROW_HEIGHT = 42;
export const NAME_COLUMN_WIDTH = 170;
export const MAX_TABLE_SIZE = 680;
export const PROGRESS_BUBBLE_WIDTH = 38;
export const DIAMOND_BUBBLE_WIDTH = 38;
export const PILL_BUBBLE_WIDTH = 180;

export const progressStyles = {
  lessonHeading: {
    fontFamily: '"Gotham 5r", sans-serif',
    paddingTop: 10,
    paddingLeft: 8
  },
  // For 'hover' to be applied, you should wrap the component using this style in Radium.
  lessonNumberHeading: {
    paddingTop: 9,
    paddingBotton: 9,
    paddingLeft: 11,
    paddingRight: 11,
    fontFamily: '"Gotham 5r", sans-serif',
    ':hover': {
      cursor: 'pointer'
    },
    textAlign: 'center'
  },
  lessonOfInterest: {
    backgroundColor: color.teal,
    color: color.white,
    fontSize: 18,
    padding: 10,
    textAlign: 'center'
  },
  multigrid: {
    border: '1px solid',
    borderColor: color.border_gray,
    padding: 0,
  },
  bottomLeft: {
    borderRight: '2px solid',
    borderColor: color.border_gray,
  },
  topLeft: {
    borderBottom: '2px solid',
    borderRight: '2px solid',
    borderColor: color.border_gray,
    backgroundColor: color.table_header,
  },
  topRight: {
    borderBottom: '2px solid',
    borderRight: '1px solid',
    borderColor: color.border_gray,
    backgroundColor: color.table_header,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    width: PROGRESS_BUBBLE_WIDTH,
    fontSize: 20,
  },
  unpluggedIcon: {
    width: PILL_BUBBLE_WIDTH,
    fontSize: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 12,
  },
  link: {
    color: color.teal,
  },
  summaryCell: {
    margin: '9px 7px',
  },
  nameCell: {
    margin: 10,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  cell: {
    borderRight: '1px solid',
    borderColor: color.border_gray,
  }
};
