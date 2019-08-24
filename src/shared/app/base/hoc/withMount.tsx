/* @flow */

import * as React from "react";

interface Props {
  handleMount: () => void;
  handleUnmount: () => void;
}

export default function mount(WrappedComponent: any): React.Node {
  class MountableComponent extends React.Component<Props> {
    componentDidMount() {
      const { handleMount } = this.props;

      handleMount && handleMount();
    }

    componentWillUnmount() {
      const { handleUnmount } = this.props;

      handleUnmount && handleUnmount();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  MountableComponent.displayName = `MountableComponent(${getDisplayName(
    WrappedComponent
  )})`;

  return MountableComponent;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
