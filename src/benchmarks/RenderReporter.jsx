import { useEffect } from "react";

const RenderReporter = ({ data, onRender }) => {
  useEffect(() => {
    onRender();
  }, [data])

  return <div/>
}

export default RenderReporter
