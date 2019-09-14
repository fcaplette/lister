import VisibilityFilterDumb from "./VisibilityFilterDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { setVisibilityFilter } from "../action/visibilityActions";

const mapStateToProps = (): Object => {
  return {};
};

const mapDispatchToProps = (dispatch: any): Object => {
  return {
    handleChangeVisibility(visibilityFilter: string) {
      dispatch(setVisibilityFilter(visibilityFilter));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(VisibilityFilterDumb);
