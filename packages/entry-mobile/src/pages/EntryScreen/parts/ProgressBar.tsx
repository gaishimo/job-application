import React from "react"
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient"
import * as Svg from "react-native-svg"
import { Colors } from "../../../values"

export default function ProgressBar() {
  return (
    <SvgAnimatedLinearGradient
      height={20}
      width={"100%"}
      primaryColor={"rgb(230, 230, 230)"}
      secondaryColor={Colors.primary}
    >
      <Svg.Rect x={0} y={6} height={10} rx={5} ry={5} width={"100%"} />
    </SvgAnimatedLinearGradient>
  )
}
