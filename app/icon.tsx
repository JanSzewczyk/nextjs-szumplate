import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  height: 32,
  width: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#111111FF",
        color: "#EAEAEAFF",
        display: "flex",
        fontSize: 16,
        height: "100%",
        justifyContent: "center",
        width: "100%"
      }}
    >
      NS
    </div>,
    {
      ...size
    }
  );
}
